<template>
  <div>
    <!-- <img id="logo" src="~@/assets/logo.png" alt="electron-vue"> -->
   
    <div class="d-flex justify-content-between mb-3">
       <h5>Tasks
    </h5>
      <!-- <button class="btn btn-sm btn-outline-secondary" @click.prevent="addNew"> <i class="fa fa-plus"></i> Add
                            </button>  -->
    </div>

    <div class="row">
      <div class="col">
           <table class="table table-hover table-sm">
              <thead>
                  <tr>
                      <th>id</th>
                       <th>Project</th>
                      <th>Name</th>
                      <th>Priority</th>
                     
                      <!-- <th>
                      </th> -->
                  </tr>
              </thead>
              <tbody>
                  <tr :key="item.id" v-for="(item) in items">
                      <td>{{item.id}}</td>
                        <td>{{item.project_name}}</td> 
                      <td>{{item.name}}</td>                            
                      <td>{{item.priority}}</td>   
                    
                      <!-- <td>

                         
                            <button class="btn btn-sm btn-outline-secondary" @click.prevent="editTask(item)"> <i class="fa fa-edit"></i>
                            </button>    
                         
                      </td> -->
                  </tr>
              </tbody>
          </table>
      </div>
    </div>
         
  </div>
</template>

<script>
  //import SystemInformation from './LandingPage/SystemInformation'
  

  export default {
    name: 'task-list',
    created(){
      let vm = this;
      let url =   "http://pm.nasctech.com/api/v1/custom_objects/timetracker/get_tasks";
      vm.$db.tasks.find({}).sort({id:-1}).exec(function (err, docs) {
           vm.items = docs;
        });
      // axios.get(url, {
      //   params: {
      //     token:"f9Y4xvgNKv1dzzBfoF7m"
      //   }
      //   }).then(function(result){
      //     console.log(result);
      //     vm.$db.tasks.insert(result.data, function (err, newDocs) {
      //         console.log(newDocs);
      //       });
      //      vm.items = result.data;
      // });
    },
    computed:{
        lastUpdatedDate(){          
           return this.$store.state.common.lastUpdatedDate;        
        }
    },
    watch:{
        lastUpdatedDate(newD,oldD){
          let vm = this;
          if(newD)
            {
              vm.$db.tasks.find({}).sort({id:-1}).exec(function (err, docs) {
                    vm.items = docs;
                  });
            }

        },
    },
    data: function(){
      return {
        items: [] //[{id:1, name:"SomeName"}, {id:2, name:"SomeName2"},{id:3, name:"SomeName3"},{id:4, name:"SomeName4"}]
      };

    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      addNew(){
          this.$router.push({ name: 'task-create' });
      },
      editTask(item){
        this.$router.push({ path: `/taskEdit/${item._id}` });
      }
    }
  }
</script>

