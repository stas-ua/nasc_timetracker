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
               <button class="btn btn-sm btn-outline-secondary" @click.prevent="push">
                <i class="fa fa-cloud-upload"></i> Push
              </button>
              <button class="btn btn-sm btn-outline-secondary ml-2 mr-2" @click.prevent="addNew">
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
                     <th><input type="checkbox" v-model="allItemsSelected" /></th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Project</th>
                      <th>Task</th>
                      <th>PM ID</th>
                      <th>Spent Time</th>
                      <th>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr :key="item._id" v-for="(item) in items" :class="{'text-danger':item.active, 'text-success': item.uploaded}">
                      <td><input type="checkbox" v-model="item.selected" /></td>  
                      <td>{{item.name}}</td>                            
                      <td>{{item.date|formatDate}}</td>   
                      <td>{{item.project?item.project.name:''}}</td> 
                      <td>{{item.task?item.task.name:''}}</td>   
                         <td>{{item.pmId}}</td>  
                       <td>{{toHHMMSS(item.spentTime)}}</td>  
                      <td>

                       
                           <div class="toolbar">
                                    <button v-show="item.active" class="btn btn-sm btn-outline-danger" @click.prevent="stopActivity(item)" title="Stop" ><i class="fa fa-stop"></i></button>
                                    <button v-show="!item.active && !item.uploaded" class="btn btn-sm btn-outline-secondary" @click.prevent="startActivity(item)" title="Start" ><i class="fa fa-play"></i></button>
                                     <button class="btn btn-sm btn-outline-secondary" @click.prevent="editActivity(item._id)" v-show="!item.uploaded"> <i class="fa fa-edit" ></i></button>  
                                     <button class="btn btn-sm btn-outline-secondary" @click.prevent="editActivity(item._id)" v-show="item.uploaded"> <i class="fa fa-eye" ></i>
                            </button>  
                                </div>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>
     <!-- <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="true"></loading> -->
          <vue-element-loading :active="isLoading" is-full-screen/>
          <errors-popup :show="showErrorsPopup" :error-items="activityErrors" @canceled="showErrorsPopup=false; activityErrors = [];"></errors-popup>
  </div>
</template>

<script>
  //import SystemInformation from './LandingPage/SystemInformation'
 import api from '../api';

import { setTimeout } from 'timers';
import VueElementLoading from 'vue-element-loading';
var log = require('electron-log');
  import ErrorsPopup from './ActivityErrorsPopup';

  export default {
    name: 'activity-list',
components: {
    VueElementLoading, ErrorsPopup
  },
    beforeDestroy(){
         clearInterval(this.activeTask);
    },
    created(){
      let vm = this;
      vm.$db.activities.find({}).sort({createdOn:-1}).exec( function (err, docs) {
        
           vm.items = docs.map(act=>{
             return Object.assign({ selected:false}, act);
           });
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
        isLoading:false,
       // allItemsSelected:false,
       // activeTime:null,
        items: [], //[{id:1, name:"SomeName"}, {id:2, name:"SomeName2"},{id:3, name:"SomeName3"},{id:4, name:"SomeName4"}],
        showErrorsPopup:false,
        activityErrors:[],
      };

    },
    computed:{
      allItemsSelected:{
        get () {
          return this.items.some(it=>it.selected);
        },
        set (value) {
          this.items.forEach(it=>it.selected=value);
          
        }
      }
    },
    methods: {
      async saveToDb(act){
         let vm = this;
        return new Promise(function(resolve,reject){
             vm.$db.activities.update({_id:act._id}, act, {  }, function (err, numReplaced) {

                if(err){
                  reject(err);
                } else{
                  resolve(act);
                }        
                
              });
        });
       
      },
      async pushOne(act){       
        let vm = this;        
        let sAct = {
                 projectId:act.project?act.project.id:null,
                 taskId:act.task?act.task.id:null,
                 taskStatus:act.taskStatus?act.taskStatus.id:null,
                 spentTime:(act.spentTime/3600.00).toFixed(2),
                 name:act.name,
                 date:act.date,
                 keytarget:act.keytarget?act.keytarget.id:null,
                 overtime:act.overtime?act.overtime:false,
                 deliverableId:act.deliverable?act.deliverable.id:null,
                 requirementId:act.requirement?act.requirement.id:null,
                 processId:act.process?act.process.id:null,
                 problemId:act.problem?act.problem.id:null,
                 hypotesisId:act.hypotesis?act.hypotesis.id:null,
                 workOrderId:act.workOrder?act.workOrder.id:null
               };
             return api.createActivityOnServer(sAct).then(result=>{
                  //console.log(result);
                  if(!result || !result.data){
                    throw new Error("No server result");
                  }
                  if( result.data.status && result.data.id ){
                    return {
                       uploaded : true,
                       pmId : result.data.id
                     };
                  }else{
                    throw new Error("Server return error: " + result.data.description );
                  }
                 // vm.isLoading = false;
               });
      },
      async pushAll(){
        let vm = this;

          for (const act of vm.items) {
             if(act.selected && !act.uploaded){
               try {

                 let res = await vm.pushOne(act);

                act.uploaded = res.uploaded;
                act.pmId = res.pmId;
                act.selected = false;

                let dbRes = await vm.saveToDb(act);
                

               } catch (err) {
                 log.warn(err);
                  vm.activityErrors.push({
                    activity:act,
                    error:err.name + ": " + err.message 
                  });
               }

             }
          }

          if(vm.activityErrors.length>0)
            throw new Error("Push Errors Occurred");

          return ;

       
      },
      push(){

        let vm = this;

        log.info("Pushing activities to server: ", vm.items.filter(a=>a.selected&&!a.uploaded));

        vm.isLoading = true;

        vm.pushAll().then(()=>{
          //vm.allItemsSelected = false;
            vm.isLoading = false;

        }).catch(error=>{      
             log.info("Erros on pushing activities to server: ", vm.activityErrors);
            vm.isLoading = false;
            vm.showErrorsPopup = true;
        });

      },
      addNew () {
        this.$router.push({ name: 'activity-create' });
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

