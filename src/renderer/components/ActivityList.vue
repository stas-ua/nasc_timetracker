<template>
  <div>
    <!-- <img id="logo" src="~@/assets/logo.png" alt="electron-vue"> -->
    <h3 class="d-flex justify-content-between mb-3">Activities 
      <span class="text-danger " v-if="activeActivity">Current Activity Time: {{activeActivity? toHHMMSS(activeActivity.spentTime):''}}</span>
    </h3>
    <div class="d-flex justify-content-end mb-3">
        <!-- <router-link class="btn btn-sm btn-outline-success"  :to="{ name: 'activity-edit' }" >
                        <i class="fa fa-plus"></i> Add
              </router-link> -->
              <button class="btn btn-sm btn-outline-secondary" @click="addNew">
                <i class="fa fa-plus"></i> Add
              </button>
    </div>

     <!-- <div class="row">
      <div class="col">
           {{activeActivity? activeActivity.spentTime:''}}
      </div>
    </div> -->
    <div class="row">
      <div class="col">
           <table class="table table-hover table-sm">
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Project</th>
                      <th>Task</th>
                      <th>Spent Time</th>
                      <th>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr :key="item._id" v-for="(item) in items" :class="{'text-danger':item.active}">
                  
                      <td>{{item.name}}</td>                            
                      <td>{{item.date|formatDate}}</td>   
                      <td>{{item.project?item.project.name:''}}</td> 
                      <td>{{item.task?item.task.name:''}}</td>   
                       <td>{{toHHMMSS(item.spentTime)}}</td>  
                      <td>

                       
                           <div class="toolbar">
                                    <button v-show="item.active" class="btn btn-sm btn-outline-danger" @click.prevent="stopActivity(item)" title="Stop"><i class="fa fa-stop"></i></button>
                                    <button v-show="!item.active" class="btn btn-sm btn-outline-secondary" @click.prevent="startActivity(item)" title="Start"><i class="fa fa-play"></i></button>
                                     <button class="btn btn-sm btn-outline-secondary" @click.prevent="editActivity(item._id)"> <i class="fa fa-edit"></i>
                            </button>  
                                </div>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>
         
  </div>
</template>

<script>
  //import SystemInformation from './LandingPage/SystemInformation'
 // import api from '../api';



  export default {
    name: 'activity-list',
    beforeDestroy(){
         clearInterval(this.activeTask);
    },
    created(){
      let vm = this;
      vm.$db.activities.find({}).sort({createdOn:-1}).exec( function (err, docs) {
           vm.items = docs;
        });
      // let url =   "http://pm.nasctech.com/api/v1/custom_objects/timetracker/get_tasks";
      // axios.get(url, {
      //   params: {
      //     token:"f9Y4xvgNKv1dzzBfoF7m"
      //   }
      //   }).then(function(result){
      //     console.log(result);
      //      vm.items = result.data;
      // });
    },
    data: function(){
      return {
        activeTask:null,
        activeActivity:null,
       // activeTime:null,
        items: [] //[{id:1, name:"SomeName"}, {id:2, name:"SomeName2"},{id:3, name:"SomeName3"},{id:4, name:"SomeName4"}],

      };

    },
    methods: {

      addNew () {
        this.$router.push({ name: `activity-edit` });
      },
      editActivity(id){
       // this.$router.push({path:'activityEdit/' + id});
        this.$router.push({ path: `/activityEdit/${id}` });
      },
      startActivity(item){
        
          let vm = this;
          
          if(vm.activeActivity){

              clearInterval(vm.activeTask);
              vm.activeActivity.active = false;
              //vm.activeActivity.spentTime = vm.activeTime;
              vm.$db.activities.update({_id:vm.activeActivity._id}, vm.activeActivity, { upsert: true }, function (err, numReplaced, upsert) {
                //console.log(err);
                    item.active = true;
                    vm.activeActivity = item;
                      if(!vm.activeActivity.spentTime)
                         vm.activeActivity.spentTime = 0.0;
                      vm.activeTask = setInterval(function(){
                        vm.activeActivity.spentTime=vm.activeActivity.spentTime+1.0;
                        console.log("vsdvs")
                        }, 1000);
                    });
          }else{
             item.active = true;
            vm.activeActivity = item;
            if(!vm.activeActivity.spentTime){
                 vm.activeActivity.spentTime = 0.0;
            }
                        
            vm.activeTask = setInterval(function(){
              vm.activeActivity.spentTime=vm.activeActivity.spentTime+1.0;
              console.log("vm.activeActivity.spentTime", vm.activeActivity.spentTime);
              }, 1000);
          }
      },
      stopActivity(){
        let vm = this;
        clearInterval(vm.activeTask);
        vm.activeActivity.active = false;
        vm.$db.activities.update({_id:vm.activeActivity._id}, vm.activeActivity, { upsert: true }, function (err, numReplaced, upsert) {       
                 vm.activeActivity = null;             
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

