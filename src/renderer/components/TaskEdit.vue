<template>
  <div>
    <!-- <img id="logo" src="~@/assets/logo.png" alt="electron-vue"> -->
    
    <div class="d-flex justify-content-between mb-2">
      <h5>{{dbId?'Edit Task':'Create Task'}}
    </h5>
    <router-link  tag="a" :to="{ name: 'task-created-by-me-list' }" >
                        <i class="fa fa-share"></i> Back To Task List
              </router-link>
    
     
      
    </div>

    <div class="row">
      <div class="col">
            <form>
                <div class="row">
                    <div class="col-6">
                  
                        <div class="form-group">
                            <label class="col-form-label " for="name">Name <span class="text-danger">*</span></label>
                            <input v-validate="'required'" name="name" class="form-control " v-model="task.name" type="text"  placeholder="Name">                               
                            <span v-if="errors.first('name')" class="text-danger">{{ errors.first('name') }}</span>             
                        </div>
                            
                      
                        <div class="form-row">                          
                            <div class="form-group col-sm">
                                <label class="col-form-label " for="project">Project <span class="text-danger">*</span></label>

                                <select-control     
                                  v-validate="'required'"                          
                                  v-model="task.project"
                                  key="projectControl"
                                  v-bind="projectPopupParam" >
                                </select-control> 

                               <span v-if="errors.first('project')" class="text-danger">{{ errors.first('project') }}</span>    
                       

                            </div> 
                             <div class="form-group col-sm">
                                <label class="col-form-label " for="sprintItem">Sprint Item </label>

                                <select-control                              
                                  v-model="task.sprintItem"
                                  key="sprintItemControl"
                                  v-bind="sprintItemPopupParam" >
                                </select-control>                          
                       

                            </div> 
                                       
              
                        </div>  
                       
                        <div class="form-row">                  

                            <div class="form-group col-sm">
                                <label class="col-form-label " for="executor">Executor <span class="text-danger">*</span></label>
                                 <select-control 
                                 v-validate="'required'"                             
                                  v-model="task.executor"
                                  key="executorControl"
                                  v-bind="executorPopupParam" >
                                </select-control> 
                               
                                 <span v-if="errors.first('executor')" class="text-danger">{{ errors.first('executor') }}</span>    

                            </div>  
                            <div class="form-group col-sm">
                                <label class="col-form-label " for="keytarget">Key Target </label>

                                <select-control                              
                                  v-model="task.keytarget"
                                  key="keytargetControl"
                                  v-bind="keytargetPopupParam" >
                                </select-control>        

                            </div>
                              
                  
              
                        </div> 
                        <div class="form-row">                  

                            <div class="form-group col-sm-6">
                                <label class="col-form-label " for="deliverable">Deliverable </label>
                                  <select-control                              
                                  v-model="task.deliverable"
                                  key="deliverableControl"
                                  v-bind="deliverablePopupParam" >
                                </select-control> 
                           

                            </div>  
                          
                              
                  
              
                        </div> 
                           <div class="form-row">                          
                            <div class="form-group col-sm">
                                <label class="col-form-label " for="startDate">Day Start <span class="text-danger">*</span></label>
                                <datepicker name="startDate" v-validate="'required'" :bootstrap-styling="true"
                                            format="dd/MM/yyyy"
                                            v-model="task.startDate"
                                            :value="task.startDate"
                                            :clear-button="true"
                                            :calendar-button="true"
                                            calendar-button-icon="fa fa-calendar"
                                            ></datepicker>
                                <span v-if="errors.first('startDate')" class="text-danger">{{ errors.first('startDate') }}</span>
                            </div>
                             <div class="form-group col-sm">
                                <label class="col-form-label " for="endDate">Day End <span class="text-danger">*</span></label>
                                <datepicker name="endDate" v-validate="'required'" :bootstrap-styling="true"
                                            format="dd/MM/yyyy"
                                            v-model="task.endDate"
                                            :value="task.endDate"
                                            :clear-button="true"
                                            :calendar-button="true"
                                            calendar-button-icon="fa fa-calendar"
                                            ></datepicker>
                                <span v-if="errors.first('endDate')" class="text-danger">{{ errors.first('endDate') }}</span>
                            </div>
                                       
              
                        </div> 
                         <div class="form-row">                  

                            <div class="form-group col-sm-6">
                                <label class="col-form-label " for="taskStatus">Task Status</label>
                                
                                <select v-model="task.status" class="form-control " >
                                    <option :key="el.id" v-for="el in taskStatusOptions" v-bind:value="el" >{{el.text}}</option>
                                </select>
                                    
                       

                            </div>  
                            
                             <div class="form-group col-sm-6">
                                <label class="col-form-label " for="estimation">Duration  <span class="text-danger">*</span></label>                                
                                <input v-validate="'required|min_value:0.1'" name="estimation"  v-model="task.estimation" class="form-control " type="number" step="0.01" min="0.1"> 
                                 <!-- step="0.01" min="0" -->
                                   <span v-if="errors.first('estimation')" class="text-danger">{{ errors.first('estimation') }}</span>    
                            </div> 
                              
                  
              
                        </div> 
             
                         
                       
                       
                      
                        <div class="form-row">
                            <div class="form-group col">
                                <label class="col-form-label " for="description">Description <span class="text-danger">*</span></label>

                                <textarea v-validate="'required'" name="description" class="form-control " v-model="task.description" type="text"  placeholder="Type Description For The Task..">
                                </textarea>
                                <span v-if="errors.first('description')" class="text-danger">{{ errors.first('description') }}</span>
                    

                            </div>
                            
                        </div>
              
                        
                          
                                            
               
                    </div>
                </div>             
   
                   
                        
                     
                    
                

            </form>
            <br/>
            <button class="btn btn-outline-primary " @click.prevent="submit" >Save  <i class="fa fa-save"></i></button>
             <!-- <button class="btn btn-outline-secondary btn-sm" @click.prevent="submit">Cancel  <i class="fa fa-ban"></i></button> -->
                 <router-link class="btn btn-outline-secondary " tag="button" :to="{ name: 'task-list' }" >
                        <i class="fa fa-ban"></i> Cancel
              </router-link>


      </div>
    </div>



            <vue-element-loading :active="isLoading" is-full-screen/>

  </div>
</template>

<script>
  //import SystemInformation from './LandingPage/SystemInformation'
 // import axios from 'axios';
 import Datepicker from 'vuejs-datepicker';
   import {toHHMMSSObj} from '../common/util';
   import api from '../api';
   import sync from '../service/syncService';
   import VueElementLoading from 'vue-element-loading';
   import SelectControl from './SelectItemControl';
  var log = require('electron-log');

  export default {
    components:{Datepicker, VueElementLoading, SelectControl},
    props: ['dbId'],
    name: 'task-edit',
    created(){
      let vm = this;
     // console.log(this.dbId);
      if(vm.dbId){
        //  vm.$db.tasks.findOne({_id:this.dbId}, function (err, doc) {
        //         //console.log(doc);
        //         if(doc)
        //            vm.task = doc;                
        //       });
        //this.task = this.updatedTask;
        vm.isLoading = true;
        api.getTask(vm.dbId).then(result=>{
             if(result && result.data && result.data.length ){
                 let t = result.data[0];
                 if(t.id == vm.dbId){
                   vm.setTaskFromServerModel(t) ;
                    vm.isLoading = false;
                     vm.init = true;
                 }else{
                    log.warn("getTask by id retun task with not the same id");
                    vm.isLoading = false;
                    alert("An error ocurred while loading task from server");
                    vm.quite();
                 }
                  
              }else{
                log.error("No result from server");
                vm.isLoading = false;
                 alert("An error ocurred while loading task from server");
                    vm.quite();
              }
        }).catch(err=>{
            log.error("Error in getTask func", err);
            vm.isLoading = false;
             alert("An error ocurred while loading task from server");
                    vm.quite();
        });
      }else{
        vm.init = true;
      }
    },
    computed:{     

      disabledDates(){ 
        return {   
          from: new Date() //new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        };
      }
    },
    methods: {
      setTaskFromServerModel(t){
        //console.log(t)
         let tstatus = null;
         this.task.id = t.id;
          if(t.status && t.status.id)
            this.task.status  = this.taskStatusOptions.find(x=>x.id==t.status.id);
            else
            this.task.status = null;

          this.task.name = t.name;
          this.task.project = t.project;
          this.task.sprintItem = t.sprintItem;
          this.task.keytarget = t.keytarget;
          this.task.deliverable = t.deliverable;
          this.task.executor = t.executor;
          if(t.startDate)
            this.task.startDate = new Date(t.startDate);
          else
            this.task.startDate = null;
          if(t.endDate)
            this.task.endDate = new Date(t.endDate);
          else
             this.task.endDate = null;

          this.task.estimation = t.estimation;
          this.task.description = t.description;
        //  this.task.status = t.status;
          // console.log (this.task)

          
      },
      submit () {
        let vm = this;
        vm.$validator.validateAll().then((result) => {
        if (result) {
         
        //  if(!vm.task.project&&!vm.activity.task)
        //  {
        //    alert('Project OR Task Should Be selected!');
        //    return;
        //  }
          vm.isLoading = true;
          vm.createOnServer(vm.task).then(res=>{
              return sync.loadTasks();
          }).then((result)=>{
           
              vm.isLoading = false;
              if(vm.dbId)
                alert("Task Updated");
              else
                alert("Task Created");
              vm.quite();

          }).catch(err=>{
              log.error("Error on task creation", err);
              vm.isLoading = false;             
              alert("An Error ocurred:" +  err.message);
          });
       
         
        }else{
             alert('Please, check errors on fields!');
        }

       
      });
        
      },
      quite(){
        //console.log("in quite");
        let vm = this;
            vm.$router.push({ name: 'task-created-by-me-list' });
      },
       async createOnServer(task){       
        let vm = this;        
        let servTask = {                  
                 project:task.project?task.project.id:null,
                 executor:task.executor?task.executor.id:null,
                 taskStatus:task.status?task.status.id:null,
                 estimation:task.estimation,
                 name:task.name,
                 description:task.description,
                 startDay:task.startDate,
                 endDay:task.endDate,
                 keyTarget:task.keytarget?task.keytarget.id:null,
                 sprintItem:task.sprintItem?task.sprintItem.id:null,
                 deliverable:task.deliverable?task.deliverable.id:null,
               };
        if(this.task.id)
            servTask.taskId = this.task.id;
            
        return api.createTaskOnServer(servTask).then(result=>{
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

      selectItem(param, item){
        this.task[param.editedPropertyName] = item;        
        param.show = false;
      },

      // setProjectFromTask(item){
      //   let vm = this;
      //   //console.log("svsdvsd");
      //   vm.$db.projects.findOne({id:item.project_id}, function (err, doc) {
      //             //console.log(doc);
      //             if(err){
      //               console.error("error on set project", err);
      //             }else{
      //                vm.activity.project = doc;
      //                // console.log("vdvsdv");
      //             }
                    
      //           });
      // },      
      // setProjectFromKeyTarget(item){
      //   let vm = this;
      //   //console.log("svsdvsd", item);
      //   vm.$db.projects.findOne({id:item.projectId}, function (err, doc) {
      //             //console.log(doc);
      //             if(err){
      //               console.error("error on set project", err);
      //             }else{
      //                vm.activity.project = doc;
      //                // console.log("vdvsdv");
      //             }
                    
      //           });
      // },
      // clearAllProjectRelatedProperties(item){
      //   if(item){
      //       if(this.activity.task && this.activity.task.project_id!=item.id)
      //         this.activity.task = null;
      //       if(this.activity.keytarget && this.activity.keytarget.projectId!=item.id)
      //         this.activity.keytarget = null;
      //   }else{

      //   }
        
      // },
      toHHMMSS:toHHMMSSObj,
      setExecutorFromKeyTarget(item){
        let vm = this;
        vm.$db.users.findOne({id:item.user}, function (err, doc) {
                
                  if(err){
                    console.error("setExecutorFromKeyTarget", err);
                  }else if(doc){
                     vm.task.executor = doc;
                     // console.log("vdvsdv");
                  }
                    
                });
      },
      filterKeyTargetByExecutor(item){
          let vm =this; 
          if(item){
              vm.keytargetPopupParam.filter = { 
                user: item.id
              };
            }else{
              vm.keytargetPopupParam.filter = {  };
            }
      },
      clearKeyTarget(item){
        if(item){
            if(this.task.keytarget && this.task.keytarget.user!=item.id)
              this.task.keytarget = null;
        }else{

        }
        
      },
      
    },
    watch:{
      // "activity.project": function(newVal, oldVal){
      //   if(newVal!=oldVal){
      //     this.clearAllProjectRelatedProperties(newVal);
      //   }
      // },
      "task.keytarget": function(newVal, oldVal){
       //  console.log("activity.keytarget", newVal, oldVal);
        if(newVal!=oldVal){
           if(newVal  && this.init){

             if(newVal.user && this.task.executor==null)
                this.setExecutorFromKeyTarget(newVal);
             else if(newVal.user && this.task.executor.id!==newVal.user)
                this.setExecutorFromKeyTarget(newVal);

            }else{
            }
        }
      },
       "task.executor": function(newVal, oldVal){
       //  console.log("activity.keytarget", newVal, oldVal);
        let vm =this; 
        // console.log("activity.project", newVal, oldVal);
        if(newVal!=oldVal){
          if(this.init){
                vm.clearKeyTarget(newVal);
          }            
          vm.filterKeyTargetByExecutor(newVal);

        }
      },
    },
    data: function(){
      return {
        init:false,
        isLoading:false,
        executorPopupParam:{
          show:false,
          collectionName:"users",
          editedPropertyName:"executor",
          name:'executor',
          limit:1000,
          columnsConfig:[
              {key:"id", caption:"Id", trackBy:true, hidden:true},
              {key:"short", caption:"Acronym", searchable:true}, 
              {key:"name", caption:"Name", searchable:true, label:true},
              {key:"email", caption:"Email", searchable:true}
            ],
            filter:{},
        }, 
        sprintItemPopupParam:{
          show:false,
          collectionName:"sprintItems",
          editedPropertyName:"sprintItem",
           name:'sprintItem',
          limit:1000,
          columnsConfig:[
              {key:"id", caption:"Id", trackBy:true}, 
              //{key:"projectName", caption:"Project", searchable:true},
              {key:"sprintName", caption:"Sprint", searchable:true},
               {key:"itemDescription", caption:"Description", searchable:true, label:true},
            ],
            filter:{},
        },  
         projectPopupParam:{
          show:false,
          collectionName:"projects",
          editedPropertyName:"project",
          name:'project',
           limit:1000,
          columnsConfig:[
              {key:"id", caption:"Id", trackBy:true}, 
              {key:"name", caption:"Name", searchable:true, label:true},
            ],
             filter:{},
        },   
         keytargetPopupParam:{
          show:false,
          collectionName:"keyTargets",
          editedPropertyName:"keytarget",
          name:'keytarget',
          limit:1000,
          columnsConfig:[
              {key:"id", caption:"Id", trackBy:true}, 
              {key:"projectName", caption:"Project", searchable:true},
              {key:"name", caption:"Key Target", searchable:true, label:true},
              {key:"userName", caption:"Executor", searchable:true}
            ],
            filter:{},
        },   
        deliverablePopupParam:{
          show:false,
          collectionName:"deliverables",
          editedPropertyName:"deliverable",
          name:'deliverable',
          limit:1000,
          columnsConfig:[
              {key:"id", caption:"Id", trackBy:true}, 
              {key:"name", caption:"Name", searchable:true, label:true}
            ],
            filter:{},
        },       

        task:{
          
          name: null,
          project:null,
          sprintItem:null,
          deliverable:null,
          keytarget:null,
          executor:null,
          estimation:0.0,
          startDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
          endDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000 ),
          description:null,
          status:{id:1,text:"New"},
          //createdBy:0,
          //uploaded:false,
          createdOn:new Date(),

        },
        taskStatusOptions:[
          {id:1,text:"New"},
          {id:2,text:"In progress"},
          {id:3,text:"Resolved"},
          {id:4,text:"Feedback"},
          {id:5,text:"Closed"},
          {id:6,text:"Rejected"},
          {id:7,text:"Hold"},
          {id:8,text:"ReDev"},
          {id:9,text:"Success"},
        ]
        
      };

    },
  }
</script>


