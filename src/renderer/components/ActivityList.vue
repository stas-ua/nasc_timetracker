<template>
  <div>
   
    <div class="d-flex justify-content-between mb-3">
      <div class="d-flex">
           <h5 class="mr-3">Activities </h5>
            <span class="" :class="{'text-danger':isTimerRunning}" >Total: {{totalSpent}}; Today: {{todaySpent}}</span>
      </div>
   
         <!-- <span class="text-danger " v-if="activeActivity">Current Activity Time: {{activeActivity? toHHMMSS(activeActivity.spentTime):''}}</span> -->
      <div>
          <!-- <button class="btn btn-sm btn-outline-danger" @click.prevent="deleteSelected">
                <i class="fa fa-trash"></i> Delete
              </button>
               <button class="btn btn-sm btn-outline-secondary ml-2 " @click.prevent="push">
                <i class="fa fa-cloud-upload"></i> Push
              </button> -->
              <div class="btn-group">
                <button  :disabled="!someItemSelected" class="btn  btn-sm btn-outline-danger ml-3 dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Actions
                </button>
                <div class="dropdown-menu">
                   <a class="dropdown-item" href="#" @click.prevent="push"><i class="fa fa-cloud-upload"></i> Push Selected</a>
                  <a class="dropdown-item" href="#"  @click.prevent="deleteSelected"><i class="fa fa-trash"></i> Delete Selected</a>
                  <a class="dropdown-item" href="#" @click.prevent="copySelected"><i class="fa fa-clone"></i> Clone Selected</a>
                </div>
              </div>
              <button class="btn btn-sm btn-outline-secondary ml-2 mr-2" @click.prevent="addNew">
                <i class="fa fa-plus"></i> Add
              </button>
      </div>

    </div>

  
    <div class="row">
      <div class="col">
           <table class="table table-hover table-sm">
              <thead>
                  <tr>
                     <th><input type="checkbox" v-model="allItemsSelected" /></th>
                      <th>
                          <sortable-item
                        name="Name"
                        prop="name"
                        :dir="columnsConfig.name.sortDir"                         
                        @sortChange="sortChange"></sortable-item>
                      </th>
                      <th><sortable-item
                        name="Date"
                        prop="date"
                        :dir="columnsConfig.date.sortDir"                         
                        @sortChange="sortChange"></sortable-item></th>
                      <th><sortable-item
                        name="Project"
                        prop="project"
                        :dir="columnsConfig.project.sortDir"                         
                        @sortChange="sortChange"></sortable-item></th>
                      <th><sortable-item
                        name="Task"
                        prop="task"
                        :dir="columnsConfig.task.sortDir"                         
                        @sortChange="sortChange"></sortable-item></th>
                      <th><sortable-item
                        name="PM ID"
                        prop="pmId"
                        :dir="columnsConfig.pmId.sortDir"                         
                        @sortChange="sortChange"></sortable-item></th>
                      <th><sortable-item
                        name="Spent Time"
                        prop="spentTime"
                        :dir="columnsConfig.spentTime.sortDir"                         
                        @sortChange="sortChange"></sortable-item></th>
                      <th>
                      </th>
                  </tr>
              </thead>
              <tbody v-loading="isLoading">
                  <tr :key="item._id" v-for="(item) in items" :class="{'text-danger':isActive(item), 'text-success': item.uploaded}">
                      <td><input type="checkbox" v-model="item.selected" /></td>  
                      <td>{{item.name}}</td>                            
                      <td>{{item.date|formatDate}}</td>   
                      <td>{{item.project?item.project.name:''}}</td> 
                      <td>{{item.task?item.task.name:''}}</td>   
                         <td>{{item.pmId}}</td>  
                       <td>{{isActive(item)?toHHMMSS(activeActivity.spentTime):toHHMMSS(item.spentTime)}}</td>  
                      <td>

                       
                           <div class="toolbar">
                                    <button v-show="isActive(item)" class="btn btn-sm btn-outline-danger" @click.prevent="stopActivity(item)" title="Stop" ><i class="fa fa-stop"></i></button>
                                    <button v-show="!isActive(item) && !item.uploaded" class="btn btn-sm btn-outline-secondary" @click.prevent="startActivity(item)" title="Start" ><i class="fa fa-play"></i></button>
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
   import SortableItem from './SortableItem'

import { setTimeout } from 'timers';
import VueElementLoading from 'vue-element-loading';
var log = require('electron-log');
  import ErrorsPopup from './ActivityErrorsPopup';
  import {toHHMMSS} from '../common/util';
  import moment from 'moment';

  export default {
    name: 'activity-list',
components: {
    VueElementLoading, ErrorsPopup, SortableItem
  },
    beforeDestroy(){
         //clearInterval(this.activeTask);
    },
    created(){
      let vm = this;
      vm.tableLoading = true;
      vm.loadActivitiesAsync().then(()=>{
        vm.tableLoading = false;
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
        //activeTask:null,
        //activeActivity:null,
        isLoading:false,
        tableLoading:false,
       // allItemsSelected:false,
       // activeTime:null,
        items: [], //[{id:1, name:"SomeName"}, {id:2, name:"SomeName2"},{id:3, name:"SomeName3"},{id:4, name:"SomeName4"}],
        showErrorsPopup:false,
        activityErrors:[],
        columnsConfig:{
          name:{sortNum:1,sortDir:null},
          date:{sortNum:2,sortDir:null},
          project:{sortNum:3,sortDir:null},
           task:{sortNum:4,sortDir:null},
          pmId:{
            sortNum:5,
            sortDir:null  },
          spentTime:{
            sortNum:5,
            sortDir:null  },

        },
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
      },
      someItemSelected(){
          return this.items.some(it=>it.selected);
      },
      activeActivity(){
        return this.$store.state.activity.activeActivity;
      },
      isTimerRunning(){
        return this.$store.state.activity.timerTaskId!=null;
      },
      totalSpent(){
       // let actSpenttime = vm.activeActivity.spentTime;
      let vm = this;
            return toHHMMSS(vm.items.reduce((accum, curr, i)=>{
              if(vm.activeActivity && curr._id==vm.activeActivity._id)
                return accum;
              else
              return accum + curr.spentTime;
            },vm.activeActivity? vm.activeActivity.spentTime:0.0));
      
      },
      todaySpent(){
        let vm = this;
        let today  = new Date();
        today.setHours(0,0,0,0);
        let aDate;
        let initial = 0.0;
        //let activeAct = vm.activeActivity;
        if(vm.activeActivity){
             let activeActDate = new Date(vm.activeActivity.date.getTime());
             activeActDate.setHours(0,0,0,0);
             if(today.getTime()==activeActDate.getTime())
                initial = vm.activeActivity.spentTime;
        }
     

        return toHHMMSS(vm.items.reduce((accum, curr, i)=>{

              aDate = new Date(curr.date.getTime());
              aDate.setHours(0,0,0,0);
              if(today.getTime()!=aDate.getTime())
                return accum;
              
              if(vm.activeActivity && curr._id==vm.activeActivity._id)
                return accum;

             
           
              return accum + curr.spentTime;
            },initial));
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
    },
    methods: {
      copySelected(){
        let vm = this;
        if(!vm.items.some(a=>a.selected))
        {
          alert("You should select at least one activity");
          return;
        }
         vm.isLoading = true;
        let items = vm.items.filter(a=>a.selected);
        let clonedActs = JSON.parse(JSON.stringify(items));
        for(let act of clonedActs){
            act.createdOn = new Date();
            act.name = 'Copy of [' + act.name + ']';
            act.pmId = null;
            act.date = new Date();
            act.uploaded = null;
            act.selected = false;
            act.spentTime = 0.0;
            delete act._id;
        }

        vm.insertActivitiesToDb(clonedActs)
        .then(res=>{
          return vm.loadActivitiesAsync();
        })
        .then(()=>{
            vm.isLoading = false;
            for(let a of items){
                a.selected = false;
            }
        })
        .catch(err=>{
            log.error("error in copy  activities", err);
            vm.$message({
              message: 'error in copy  activities',
              type: 'error'
            });
        });

      },

      async insertActivitiesToDb(activities){
        let vm = this;
        return new Promise(function(resolve,reject){
              vm.$db.activities.insert(activities, function (err,newDocs) {
                              if(err){
                                  log.error("error in copy  activities (inserting process (nedb insert)", err);
                                  reject(err);
                              }else{
                                resolve(newDocs);
                              }
                              
                          });
        });


      },
      async loadActivitiesAsync(){
        let vm = this;

        return  new Promise(function(resolve,reject){
          let sortPrm = vm.sortObjParam;
          sortPrm.createdOn =-1;
          vm.$db.activities.find({}).sort(sortPrm).exec( function (err, docs) {
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
      deleteSelected(){
        let vm = this;
        if(!vm.items.some(a=>a.selected))
        {
          alert("You should select at least one activity");
          return;
        }
        if(vm.items.some(a=>a.selected && vm.isActive(a)))
        {
          alert("Active activity could not be deleted. Stop timer first and try again");
          return;
        }
        if(!confirm("Selected activities (" + vm.items.filter(a=>a.selected).length + ") will be deleted. Do you want to continue?")){
          return;
        }
        log.info("Deleting activities : ", vm.items.filter(a=>a.selected));
        vm.isLoading = true;
        
        vm.archiveActivitiesAsync()
        .then(res=>{
          return vm.loadActivitiesAsync();
        })
        .then(res=>{
            vm.isLoading = false;
        }).catch(err=>{
          alert("An error occured during deletion: " + err.message);
            vm.isLoading = false;
        });  
      },
      async archiveActivitiesAsync(items){
        let vm = this;
        await vm.insertToArchivedActivitiesAsync();
        await vm.cleanUpArchivedActivitiesAsync();
        await vm.deleteActivitiesAsync();
        return;    
      },
      async insertToArchivedActivitiesAsync(){
        let vm = this;
        let items = vm.items.filter(a=>a.selected);
        return new Promise(function(resolve,reject){
            vm.$db.activitiesDeleted.insert(items, function (err) {
                            if(err){
                                log.error("error in  activitiesDeleted inserting process (nedb insert)", err);
                                reject(err);
                            }else{
                              resolve();
                            }
                            
                        });

        });
        
      },
      async cleanUpArchivedActivitiesAsync(){
        let vm = this;
        return new Promise(function(resolve,reject){
            let threeMonthAgoDate = moment().subtract(3, 'months').startOf('month');
            vm.$db.activitiesDeleted.remove({createdOn:{$lt:threeMonthAgoDate }}, { multi: true }, function (err, numRemoved) {
                            if(err){
                                log.error("error in cleanUpArchivedActivitiesAsync", err);
                                reject(err);
                            }else{
                              log.info("Cleaned up old activities; numRemoved: " + numRemoved + "; from date: "  + threeMonthAgoDate.format() );
                              resolve(numRemoved);
                            }
                            
                        });

        });
        
      },
      async deleteActivitiesAsync(){
        let vm = this;
        let items = vm.items.filter(a=>a.selected);
        for(const item of items){

          await vm.deleteOneActivityAsync(item);
        }
        return;
      },
      async deleteOneActivityAsync(item){
        let vm = this;
        return new Promise(function(resolve,reject){
            vm.$db.activities.remove({_id:item._id}, {}, function (err) {
                            if(err){
                                log.error("error in  deleteOneActivityAsync  process (nedb remove)", err);
                                reject(err);
                            }else{
                                resolve(item);
                            }
                            
                        });

        });
        
      },
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
                 workOrderId:act.workOrder?act.workOrder.id:null,
                 activityTypeId:act.activityType?act.activityType.id:null,
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
                 if(act.spentTime<0.01)
                  throw new Error("Spent Time should be at least 36 sec");

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
        if(!vm.items.some(a=>a.selected&&!a.uploaded))
        {
          alert("You should select at least one not uploaded activity");
          return;
        }
        if(vm.items.some(a=>a.selected && vm.isActive(a)))
        {
          alert("Active activity could not be pushed. Stop timer first and try it again. Or unselect active one.");
          return;
        }

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
          
          if(vm.isTimerRunning){
              vm.$store.dispatch("stopTimer").then(()=>{
                let lastAct = vm.items.find(it=>it._id==vm.activeActivity._id);
                lastAct.spentTime = vm.activeActivity.spentTime;
                vm.$store.dispatch("startTimer", item);
              });
              
              // clearInterval(vm.activeTask);
              // vm.activeActivity.active = false;
              // //vm.activeActivity.spentTime = vm.activeTime;
              // vm.$db.activities.update({_id:vm.activeActivity._id}, vm.activeActivity, { upsert: true }, function (err, numReplaced, upsert) {
              //   //console.log(err);
              //       item.active = true;
              //       vm.activeActivity = item;
              //         if(!vm.activeActivity.spentTime)
              //            vm.activeActivity.spentTime = 0.0;
              //         vm.activeTask = setInterval(function(){
              //           vm.activeActivity.spentTime=vm.activeActivity.spentTime+1.0;
              //           console.log("vsdvs")
              //           }, 1000);
              //       });
          }else{
            vm.$store.dispatch("startTimer", item);
            //  item.active = true;
            // vm.activeActivity = item;
            // if(!vm.activeActivity.spentTime){
            //      vm.activeActivity.spentTime = 0.0;
            // }
                        
            // vm.activeTask = setInterval(function(){
            //   vm.activeActivity.spentTime=vm.activeActivity.spentTime+1.0;
            //   console.log("vm.activeActivity.spentTime", vm.activeActivity.spentTime);
            //   }, 1000);
          }
      },
      stopActivity(){
        let vm = this;
         if(vm.isTimerRunning){
            vm.$store.dispatch("stopTimer").then(()=>{
                      let lastAct = vm.items.find(it=>it._id==vm.activeActivity._id);
                      lastAct.spentTime = vm.activeActivity.spentTime;
                      vm.$store.commit("RESET_STATE");
                  });
         }
        // clearInterval(vm.activeTask);
        // vm.activeActivity.active = false;
        // vm.$db.activities.update({_id:vm.activeActivity._id}, vm.activeActivity, { upsert: true }, function (err, numReplaced, upsert) {       
        //          vm.activeActivity = null;             
        //       });
      },
      toHHMMSS:toHHMMSS,
      isActive(act){
        let vm = this;
        if(vm.isTimerRunning)
          return this.$store.state.activity.activeActivity._id==act._id;
        else
          return false;
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

        this.tableLoading = true;
        this.loadActivitiesAsync().then(()=>{
          this.tableLoading = false;
        });
      },
      

    }
  }
</script>

