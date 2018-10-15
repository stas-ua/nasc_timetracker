<template>
  <div>
    <!-- <img id="logo" src="~@/assets/logo.png" alt="electron-vue"> -->
   
    <div class="d-flex justify-content-between mb-3">
       <h5>Tasks
    </h5>
      <button  v-popover:popover class="btn btn-sm btn-outline-secondary" @click.prevent="visiblePop = true"> <i class="fa fa fa-magic"></i> Create from Selected
                            </button> 
    </div>
    <el-popover
    placement="top"
    width="160"
    ref="popover"
    trigger="manual"
    v-model="visiblePop">
    <p>Are you sure?</p>
    <div style="text-align: right; margin: 0">
      <button class="btn btn-sm btn-outline-secondary" @click="visiblePop = false">No,Cancel</button>
      <button class="btn btn-sm btn-outline-success" @click="createFromSelected">Yes</button>
    </div>

  </el-popover>

    <div class="row" v-loading="isLoading">
      <div class="col">
           <table class="table table-hover table-sm">
              <thead>
                  <tr>
                     <th><input type="checkbox" v-model="allItemsSelected" /></th>
                      <th>
                        <sortable-item
                        name="ID"
                        prop="id"
                        :dir="columnsConfig.startDay.id"                         
                        @sortChange="sortChange"></sortable-item>
                       </th>
                       <th> <sortable-item
                        name="Project"
                        prop="project_name"
                        :dir="columnsConfig.project_name.sortDir" 
                        @sortChange="sortChange"></sortable-item></th>
                      <th>
                         <sortable-item
                        name="Task"
                        prop="name"
                        :dir="columnsConfig.name.sortDir" 
                        @sortChange="sortChange"></sortable-item>
                      </th>
                       <th>
                         <sortable-item
                        name="Start Day"
                        prop="startDay"
                        :dir="columnsConfig.startDay.sortDir" 
                        @sortChange="sortChange"></sortable-item>
                      </th>
                      <th>
                         <sortable-item
                        name="Priority"
                        prop="priority"
                        :dir="columnsConfig.priority.sortDir" 
                        :filters="columnsConfig.priority.filters"
                        :filterValues="columnsConfig.priority.filterValues"
                        @filterValueChange="filterChange"
                        @sortChange="sortChange"></sortable-item>
                      </th>
                     <th></th>
                     
                  </tr>
              </thead>
              <tbody>
                  <tr :key="item.id" v-for="(item) in items">
                       <td><input type="checkbox" v-model="item.selected" /></td> 
                      <td>{{item.id}}</td>
                        <td>{{item.project_name}}</td> 
                      <td>{{item.name}}</td>    
                       <td>{{item.startDay|formatDate}}</td>                          
                      <td>{{item.priority}}</td>   
               
                     
                  </tr>
              </tbody>
          </table>
 <!-- :default-sort = "{prop: 'id', order: 'descending'}" -->
           <!-- <el-table
            :data="items"
            @sort-change="sortChange"
            style="width: 100%"
            border
            size="mini">
            <el-table-column
              prop="id"
              label="ID"
              sortable = "custom"
              width="180">
            </el-table-column>
            <el-table-column
              prop="project_name"
              label="Project"
              sortable = "custom"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="Name"
              sortable = "custom"
              >
            </el-table-column>
             <el-table-column
              prop="priority"
              label="Priority"
              sortable = "custom"
              >
            </el-table-column>
          </el-table> -->
      </div>
    </div>
         
  </div>
</template>

<script>
  import SortableItem from './SortableItem'
var log = require('electron-log');

  export default {
    name: 'task-list',
    components:{SortableItem},
    created(){
      this.loadData();
    },

    computed:{
        lastUpdatedDate(){          
           return this.$store.state.common.lastUpdatedDate;        
        },
        sortObjParam(){
          let vm = this;
          let keysSorted = Object.keys(vm.columnsConfig)
          .sort(function(a,b){return vm.columnsConfig[a].sortNum-vm.columnsConfig[b].sortNum});
          
          let sortObj = {};
          for (let p of keysSorted){
            sortObj[p] = vm.columnsConfig[p].sortDir;
          }
          return sortObj;
        },
        filterObjParam(){
          let vm = this;
          let fObj = { };
          for(let prop in vm.columnsConfig){
            if(vm.columnsConfig.hasOwnProperty(prop)){
              if(vm.columnsConfig[prop].filters && vm.columnsConfig[prop].filterValues){
                if(vm.columnsConfig[prop].filters.length == vm.columnsConfig[prop].filterValues.length){
                  continue;                  
                }else{
                    fObj[prop] = { $in: vm.columnsConfig[prop].filterValues };
                }

              }
            }
          }
          return fObj;
        },
      allItemsSelected:{
        get () {
          return this.items.some(it=>it.selected);
        },
        set (value) {
          this.items.forEach(it=>it.selected=value);
          
        }
      },

    },
    watch:{
        lastUpdatedDate(newD,oldD){
          let vm = this;
          if(newD)
            {
              vm.loadData();
            }

        },
    },
    data: function(){
      return {
        visiblePop:false,
        isLoading:false,
        items: [] ,
        columnsConfig:{
          id:{sortNum:1,sortDir:1},
          project_name:{sortNum:2,sortDir:null},
          name:{sortNum:3,sortDir:null},
           startDay:{sortNum:4,sortDir:null},
          priority:{
            sortNum:5,
            sortDir:null,
            filterValues:[9,8,7,6,5,4], 
            filters:[{label:'9',value:9}, {label:'8',value:8}, {label:'7',value:7}, {label:'6',value:6}, {label:'5',value:5}, {label:'4',value:4} ], 
            },

        },
        //[{id:1, name:"SomeName"}, {id:2, name:"SomeName2"},{id:3, name:"SomeName3"},{id:4, name:"SomeName4"}]
      };

    },
    methods: {
      createFromSelected(){
        let vm = this;
        vm.visiblePop =false;
        
        if(!vm.items.some(a=>a.selected))
        {
          alert("You should select at least one item");
          
          return;
        }
        vm.isLoading = true;
        let newActivities = [];
        for(let t of vm.items){
          if(t.selected){
            newActivities.push({
              overtime:false,
              uploaded:false,
              createdOn:new Date(),
              name: 'Created from task [' + t.name  +']',
              project:{ id:t.project_id, name:t.project_name},
              task:t,
              taskStatus:{ id:t.statusId, name:t.statusName},
              keytarget:null,
              spentTime:0,
              date: new Date(),
              localId:null,
              deliverable:null,
              activityType:null,
              problem:null,
              process:null,
              hypotesis:null,
              requirement:null,
              workOrder:null,
              supportTicket:null,
              activityType:{id:10, text: 'Other'}
            });
          }
        }        

        vm.$db.activities.insert(newActivities, function (err, newDocs) {         

                if(err){
                    log.error("Error in creation activity from tasks", err)
                }else if(newDocs){
                    vm.$message({
                      message: newDocs.length +  ' activities created',
                      type: 'success'
                    });
                }
                for(let it of vm.items){
                  it.selected = false;
                }
                vm.isLoading = false;
              });
           
      },
      loadData(){
          let vm = this;
          vm.isLoading = true;
          vm.$db.tasks.find(vm.filterObjParam).sort(vm.sortObjParam).exec(function (err, docs) {
               vm.items = docs.map(d=>{
                  d.selected = false;
                  return Object.assign({}, d);
                });
               vm.isLoading = false;
            });
      },  
      addNew(){
          this.$router.push({ name: 'task-create' });
      },
      editTask(item){
        this.$router.push({ path: `/taskEdit/${item._id}` });
      },         
      sortChange(val){
        this.columnsConfig[val.prop].sortDir = val.dir;
        this.columnsConfig[val.prop].sortNum = 1;
        for(let prop in this.columnsConfig){
          if (this.columnsConfig.hasOwnProperty(prop)) {
            if(val.prop!=prop){
                this.columnsConfig[prop].sortNum ++;
            }
              
              
          }
        }       

        this.loadData();
      },
      filterChange(val){
       // console.log(val);
          this.columnsConfig[val.prop].filterValues = val.filterValues;
          this.loadData();
      },

    }
  }
</script>

