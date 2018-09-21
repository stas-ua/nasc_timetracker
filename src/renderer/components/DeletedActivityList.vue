<template>
  <div>
    <!-- <img id="logo" src="~@/assets/logo.png" alt="electron-vue"> -->
    <h3>Deleted Activities
    </h3>
    <div class="row">
      <div class="col">
           <table class="table table-hover table-sm">
              <thead>
                  <tr>
                     <!-- <th><input type="checkbox" v-model="allItemsSelected" /></th> -->
                      <th>Name</th>
                      <th>Date</th>
                      <th>Project</th>
                      <th>Task</th>
                      <th>PM ID</th>
                      <th>Spent Time</th>
                      <!-- <th>
                      </th> -->
                  </tr>
              </thead>
              <tbody>
                  <tr :key="item._id" v-for="(item) in items" :class="{'text-danger':item.active, 'text-success': item.uploaded}">
                      <!-- <td><input type="checkbox" v-model="item.selected" /></td>   -->
                      <td>{{item.name}}</td>                            
                      <td>{{item.date|formatDate}}</td>   
                      <td>{{item.project?item.project.name:''}}</td> 
                      <td>{{item.task?item.task.name:''}}</td>   
                         <td>{{item.pmId}}</td>  
                       <td>{{toHHMMSS(item.spentTime)}}</td>  
                      <!-- <td>

                       
                           <div class="toolbar">
                                    <button v-show="item.active" class="btn btn-sm btn-outline-danger" @click.prevent="stopActivity(item)" title="Stop" ><i class="fa fa-stop"></i></button>
                                    <button v-show="!item.active && !item.uploaded" class="btn btn-sm btn-outline-secondary" @click.prevent="startActivity(item)" title="Start" ><i class="fa fa-play"></i></button>
                                     <button class="btn btn-sm btn-outline-secondary" @click.prevent="editActivity(item._id)" v-show="!item.uploaded"> <i class="fa fa-edit" ></i></button>  
                                     <button class="btn btn-sm btn-outline-secondary" @click.prevent="editActivity(item._id)" v-show="item.uploaded"> <i class="fa fa-eye" ></i>
                            </button>  
                                </div>
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
    name: 'deleted-activities-list',
    created(){
      let vm = this;
      vm.loadActivitiesAsync();
    },
    data: function(){
      return {
        items: [] //[{id:1, name:"SomeName"}, {id:2, name:"SomeName2"},{id:3, name:"SomeName3"},{id:4, name:"SomeName4"}]
      };

    },
    methods: {
      async loadActivitiesAsync(){
        let vm = this;

        return  new Promise(function(resolve,reject){
          vm.$db.activitiesDeleted.find({}).sort({createdOn:-1}).exec( function (err, docs) {
            if(err){
              reject(err);
            }else{
              vm.items = docs.map(act=>{
                  act.selected = false;
                  return Object.assign({}, act);
                });
              resolve();
            }
            
          });
        });
        
      },
      toHHMMSS  (s) {
          var sec_num = s; 
          var hours   = Math.floor(sec_num / 3600);
          var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
          var seconds = sec_num - (hours * 3600) - (minutes * 60);

          if (hours   < 10) {hours   = "0"+hours;}
          if (minutes < 10) {minutes = "0"+minutes;}
          if (seconds < 10) {seconds = "0"+seconds;}
          return hours + ':' + minutes + ':' + seconds;
      }
    }
  }
</script>

