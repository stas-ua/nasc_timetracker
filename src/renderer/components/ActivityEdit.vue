<template>
  <div v-if="init">
    
    <div class="d-flex justify-content-between mb-2">
      <h5>{{dbId?'Edit Activity':'Create Activity'}}
    </h5>
<router-link  tag="a" :to="{ name: 'activity-list' }" >
                        <i class="fa fa-share"></i> Back To Activity List
              </router-link>
    <div>
      
      <div class="form-group form-check">
                                  <input type="checkbox" class="form-check-input" id="showAdditionalFields" v-model="showAdditionalFields">
                                  <label class="form-check-label" for="showAdditionalFields">Show Additional Fields</label>
      </div>
        
    </div>
    
    
     
      
    </div>

    <div class="row">
      <div class="col">
            <form>
                <div class="row">
                    <div class="col-sm-6" :class="{'border-right':showAdditionalFields}">
                        <div class="form-row">                          
                            <div class="form-group col-sm">
                                <label class="col-form-label " for="project">Project <span class="text-danger">*</span></label>

                                
                                <select-control     
                                  v-validate="'required'"                          
                                  v-model="activity.project"
                                  key="projectControl"
                                  v-bind="projectPopupParam" >
                                </select-control> 
                               <span v-if="errors.first('project')" class="text-danger">{{ errors.first('project') }}</span>

                            </div> 
                             <div class="form-group col-sm">
                                <label class="col-form-label " for="date">Date <span class="text-danger">*</span></label>
                                <datepicker name="date" v-validate="'required'" :bootstrap-styling="true"
                                            format="dd/MM/yyyy"
                                            v-model="activity.date"
                                            :value="activity.date"
                                            :clear-button="true"
                                            :calendar-button="true"
                                            calendar-button-icon="fa fa-calendar"
                                            :disabledDates="disabledDates"></datepicker>
                                <span v-if="errors.first('date')" class="text-danger">{{ errors.first('date') }}</span>
                            </div>
                                       
              
                        </div>  
                        <div class="form-row">                  

                            <div class="form-group col-sm">
                                <label class="col-form-label " for="task">Task </label>
                                 <select-control                              
                                  v-model="taskComputed"
                                  key="taskControl"
                                  v-bind="taskPopupParam" >
                                </select-control> 
                           
                       

                            </div>  
                            <div class="form-group col-sm">
                                <label class="col-form-label " for="keytarget">Key Target </label>
                                <select-control                              
                                  v-model="activity.keytarget"
                                  key="keytargetControl"
                                  v-bind="keytargetPopupParam" >
                                </select-control>          
                       

                            </div>
                              
                  
              
                        </div> 
                         <div class="form-row">                  

                            <div class="form-group col-sm-6">
                                <label class="col-form-label " for="taskStatus">Task Status</label>
                                
                                <select v-model="activity.taskStatus" class="form-control " :disabled="activity.task==null">
                                    <option :key="el.id" v-for="el in taskStatusOptions" v-bind:value="el" >{{el.text}}</option>
                                </select>
                                    
                       

                            </div>  
                            <div class="form-group col-sm">
                                  <label class="col-form-label " for="deliverable">Deliverable </label> 
                                   <select-control                              
                                      v-model="activity.deliverable"
                                      key="deliverableControl"
                                      v-bind="deliverablePopupParam" >
                                  </select-control> 
                              </div> 
                  
                              
                  
              
                        </div> 
                      
                        <div class="form-group">
                                <label class="col-form-label " for="spentTime">Spent Time <span class="text-danger">*</span></label>

                                <Timepicker v-model="spentTimePicker"></Timepicker> 

                         </div>                        
                       
                       
                     
                        <div class="form-row">
                            <div class="form-group col">
                                <label class="col-form-label " for="name">Activity <span class="text-danger">*</span></label>

                                <textarea v-validate="'required'" name="name" class="form-control " v-model="activity.name" type="text"  placeholder="Type Description For Your Activity..">
                                </textarea>
                                <span v-if="errors.first('name')" class="text-danger">{{ errors.first('name') }}</span>
                    

                            </div>
                            
                        </div>
                        <div class="row">
                            <div class=col-sm-4>
                                <div class="form-group form-check">
                                  <input type="checkbox" class="form-check-input" id="Overtime" v-model="activity.overtime">
                                  <label class="form-check-label" for="Overtime">Overtime</label>
                                </div>
                            </div>
                        </div>                  
                        
                          
                                            
               
                    </div>
                    <div class="col-sm-6" v-show="showAdditionalFields">
                      <div class="row ">
                             <div class="form-group col-sm">
                                  <label class="col-form-label " for="groupTask">Group Task </label>  
                                   <select-control                              
                                      v-model="groupTaskComputed"
                                      key="groupTaskControl"
                                      v-bind="groupTaskPopupParam" >
                                  </select-control> 

                             
                                </div> 
                                <div class="form-group col-sm">
                                  <label class="col-form-label " for="actionTask">Action Task </label>            
                                  <select-control                              
                                      v-model="actionTaskComputed"
                                      key="actionTaskControl"
                                      v-bind="actionTaskPopupParam" >
                                  </select-control>                         
                              
                                </div> 

                      </div>
                        <div class="row">
                          <div class="col-sm-6">
                              
                                <div class="form-group">
                                  <label class="col-form-label " for="requirement">Requirement </label>
                                  <select-control                              
                                      v-model="activity.requirement"
                                      key="requirementControl"
                                      v-bind="requirementPopupParam" >
                                  </select-control>                                     
                              
                                </div> 
                                <div class="form-group">
                                  <label class="col-form-label " for="supportTicket">Support Ticket </label>  
                                  <select-control                              
                                      v-model="activity.supportTicket"
                                      key="supportTicketControl"
                                      v-bind="supportTicketPopupParam" >
                                  </select-control>                                     
                            
                                </div> 
                                <div class="form-group">
                                  <label class="col-form-label " for="workOrder">Work Order </label>  
                                   <select-control                              
                                      v-model="activity.workOrder"
                                      key="workOrderControl"
                                      v-bind="workOrderPopupParam" >
                                  </select-control>                                   
                                
                                </div> 
                                
                          </div>
                          <div class="col-sm-6">
                                <div class="form-group">
                                  <label class="col-form-label " for="process">Process </label>    
                                  <select-control                              
                                      v-model="activity.process"
                                      key="processControl"
                                      v-bind="processPopupParam" >
                                  </select-control>                                  
                                
                                </div> 
                                <div class="form-group">
                                  <label class="col-form-label " for="problem">Problem </label>  
                                  <select-control                              
                                      v-model="activity.problem"
                                      key="problemControl"
                                      v-bind="problemPopupParam" >
                                  </select-control>                                    
                             
                                </div> 
                                <div class="form-group">
                                  <label class="col-form-label " for="hypotesis">Hypotesis </label>   
                                  <select-control                              
                                      v-model="activity.hypotesis"
                                      key="hypotesisControl"
                                      v-bind="hypotesisPopupParam" >
                                  </select-control>                                  
                                
                                </div> 

                                

                          </div>
                        </div>

                    </div>
                </div>             
   
                   
                        
                     
                    
                

            </form>
            <br/>
            <button class="btn btn-outline-primary " @click.prevent="submit" v-if="!activity.uploaded">Save  <i class="fa fa-save"></i></button>
             <!-- <button class="btn btn-outline-secondary btn-sm" @click.prevent="submit">Cancel  <i class="fa fa-ban"></i></button> -->
                 <router-link class="btn btn-outline-secondary " tag="button" :to="{ name: 'activity-list' }" >
                        <i class="fa fa-ban"></i> Cancel
              </router-link>


      </div>
    </div> 

         

  </div>
</template>

<script>
  //import SystemInformation from './LandingPage/SystemInformation'
 // import axios from 'axios';
 import Datepicker from 'vuejs-datepicker';
 //import SelectItemPopup from './SelectItemPopup';
 import SelectControl from './SelectItemControl';
 import Timepicker from './TimePicker';
 import {toHHMMSSObj} from '../common/util';
  import actPopup from './activityPopupParam';
  

  var log = require('electron-log');

  export default {
    components:{Datepicker, Timepicker, SelectControl},
    props: ['dbId'],
    name: 'activity-edit',
    created(){
      let vm = this;
     // console.log(this.dbId);
      if(this.dbId){
         vm.$db.activities.findOne({_id:this.dbId}, function (err, doc) {
              //  console.log(doc);
                vm.activity = doc;      
                 vm.init      =true;   
                //console.log(vm.activity)   ;
              });
      }else{
         vm.init      =true; 
      }
      vm.keytargetPopupParam.filter = {
        user:vm.$store.state.user.customUserId,
        set_by:vm.$store.state.user.systemUserId,
      };

    },
    computed:{
   
      spentTimePicker: {
          get () {
            let t = this.toHHMMSS(this.activity.spentTime);
            return t;
          },
          set (value) {

            let v = Number(value.hours) * 3600 + Number(value.minutes) * 60 + Number(value.seconds) ;
            this.activity.spentTime = v;

          }
        },

        taskComputed:{
          get(){
              if(this.activity.task && this.activity.task.groupTask)
                return null;
              else if(this.activity.task && this.activity.task.type == 2)
                return null;
             
              return this.activity.task;
          },
          set(val){
              this.activity.task = val;
          }
          
        },
        groupTaskComputed:{
          get(){
                if(this.activity.task && this.activity.task.groupTask)
                  return this.activity.task;         
                
                return null;
          },
            set(val){
                this.activity.task = val;
            }
          
        },
        actionTaskComputed:{
           get(){
                if(this.activity.task && this.activity.task.type == 2)
                  return this.activity.task;
                
                return null;
            },
            set(val){
                this.activity.task = val;
            }            
          
        }
      
    },
    methods: {
      
      submit () {
        let vm = this;
        vm.$validator.validateAll().then((result) => {
        if (result) {
         
         if(!vm.activity.project&&!vm.activity.task)
         {
           alert('Project OR Task Should Be selected!');
           return;
         }


          vm.$db.activities.update({_id:vm.dbId}, vm.activity, { upsert: true }, function (err, numReplaced, upsert) {
          //console.log(err);

          
                vm.quite();
              });
          return;
        }

        alert('Please, check errors on fields!');
      });
        
      },
      quite(){
        //console.log("in quite");
        let vm = this;
            vm.$router.push({ name: 'activity-list' });
      },
     

      selectItem(param, item){
        this.activity[param.editedPropertyName] = item;        
        param.show = false;
      },

      setProjectFrom(item){
        let vm = this;
        //console.log("svsdvsd");     
        vm.$db.projects.findOne({id:item.project_id}, function (err, doc) {
                  //console.log(doc);
                  if(err){
                    console.error("error on set project", err);
                  }else if(doc){
                   
                      vm.activity.project = doc;
                     // console.log("vdvsdv");
                  }
                    
                });
      }, 
      setProcessFrom(item){
        let vm = this;
        vm.$db.processes.findOne({id:item.processId}, function (err, doc) {
                  //console.log(doc);
                  if(err){
                    console.error("error on set proc", err);
                  }else if(doc){
                    
                     vm.activity.process = doc;
                     //vm.setProjectFrom(doc);
                     // console.log("vdvsdv");
                  }
                    
                });
      }, 
      setProblemFrom(item){
        let vm = this;
        //console.log("svsdvsd");
        vm.$db.problems.findOne({id:item.problemId}, function (err, doc) {
                  //console.log(doc);
                  if(err){
                    console.error("error on set prob", err);
                  }else if(doc){
                    
                     vm.activity.problem = doc;
                     vm.setProcessFrom(doc);
                  }
                    
                });
      }, 
      setSupportTicketFrom(item){
        let vm = this;
        //console.log("svsdvsd");
        vm.$db.supportTickets.findOne({id:item.supportTicketId}, function (err, doc) {
                  //console.log(doc);
                  if(err){
                    console.error("error on set st", err);
                  }else if(doc){
                     vm.activity.supportTicket = doc;
                     // console.log("vdvsdv");
                  }
                    
                });
      },      
      setProjectFromKeyTarget(item){
        let vm = this;
        //console.log("svsdvsd", item);
        vm.$db.projects.findOne({id:item.projectId}, function (err, doc) {
                  //console.log(doc);
                  if(err){
                    console.error("error on set project", err);
                  }else if(doc){
                     vm.activity.project = doc;
                     // console.log("vdvsdv");
                  }
                    
                });
      },
      clearAllProjectRelatedProperties(item){
        if(item){
            if(this.activity.task && this.activity.task.project_id!=item.id)
              this.activity.task = null;
            if(this.activity.keytarget && this.activity.keytarget.projectId && this.activity.keytarget.projectId!=item.id)
              this.activity.keytarget = null;
            if(this.activity.requirement && this.activity.requirement.project_id!=item.id)
              this.activity.requirement = null;
            if(this.activity.deliverable && this.activity.deliverable.project_id!=item.id)
              this.activity.deliverable = null;
        }else{

        }
        
      },
      toHHMMSS:toHHMMSSObj,
      filterAllProjectRelated(item){
        let vm =this; 
          if(item){
              vm.deliverablePopupParam.filter = { 
                project_id: item.id
              };
              vm.taskPopupParam.filter = { 
                project_id: item.id
              };
              vm.groupTaskPopupParam.filter = { 
                project_id: item.id
              };
              vm.actionTaskPopupParam.filter = { 
                project_id: item.id
              };
            }else{
              vm.deliverablePopupParam.filter = {  };
              vm.taskPopupParam.filter = {};
              vm.groupTaskPopupParam.filter = {};
              vm.actionTaskPopupParam.filter = {};
            }
      }
    },
    
    watch:{
      "activity.project": function(newVal, oldVal){
        let vm =this; 
        // console.log("activity.project", newVal, oldVal);
        if(newVal!=oldVal){
          if(this.init)
            vm.clearAllProjectRelatedProperties(newVal);
          vm.filterAllProjectRelated(newVal);
        }
      },
      "activity.task": function(newVal, oldVal){
       // console.log("activity.task", newVal, oldVal);
        if(newVal!=oldVal){
           if(newVal && this.init){

              let status = this.taskStatusOptions.find(it=>it.id==newVal.statusId)
              this.activity.taskStatus = status;

              if(newVal.project_id && this.activity.project==null)
                this.setProjectFrom(newVal);
              else if(newVal.project_id && this.activity.project.id!==newVal.project_id)
                 this.setProjectFrom(newVal);

            }else{
                this.activity.taskStatus = null;
            }
        }
      },
      "activity.keytarget": function(newVal, oldVal){
       //  console.log("activity.keytarget", newVal, oldVal);
        if(newVal!=oldVal){
           if(newVal  && this.init){

             if(newVal.projectId && this.activity.project==null)
                this.setProjectFromKeyTarget(newVal);
             else if(newVal.projectId && this.activity.project.id!==newVal.projectId)
                this.setProjectFromKeyTarget(newVal);

            }else{
            }
        }
      },
      "activity.deliverable": function(newVal, oldVal){
       // console.log("activity.task", newVal, oldVal);
        if(newVal!=oldVal){
           if(newVal && this.init){

              if(newVal.project_id && this.activity.project==null)
                this.setProjectFrom(newVal);
              else if(newVal.project_id && this.activity.project.id!==newVal.project_id)
                 this.setProjectFrom(newVal);

            }
        }
      },
      "activity.process": function(newVal, oldVal){
       // console.log("activity.task", newVal, oldVal);
        if(newVal!=oldVal){
           if(newVal && this.init){

              if(newVal.project_id && this.activity.project==null)
                this.setProjectFrom(newVal);
              else if(newVal.project_id && this.activity.project.id!==newVal.project_id)
                this.setProjectFrom(newVal);

            }
        }
      },
      "activity.problem": function(newVal, oldVal){
       // console.log("activity.task", newVal, oldVal);
        if(newVal!=oldVal){
           if(newVal && this.init){

              if(newVal.processId &&  this.activity.process==null)
                this.setProcessFrom(newVal);
              else if(newVal.processId && this.activity.process.id!==newVal.processId)
                this.setProcessFrom(newVal);

            }
        }
      },
      "activity.hypotesis": function(newVal, oldVal){
       // console.log("activity.task", newVal, oldVal);
        if(newVal!=oldVal){
           if(newVal && this.init){

              if(newVal.problemId && this.activity.problem==null)
                this.setProblemFrom(newVal);
              else if(newVal.problemId && this.activity.problem.id!==newVal.problemId)
                this.setProblemFrom(newVal);

            }
        }
      },
      "activity.requirement": function(newVal, oldVal){
       // console.log("activity.task", newVal, oldVal);
        if(newVal!=oldVal){
           if(newVal && this.init){

              if(newVal.project_id && this.activity.project==null)
                this.setProjectFrom(newVal);
              else if(newVal.project_id && this.activity.project.id!==newVal.project_id)
                 this.setProjectFrom(newVal);

            }
        }
      },
      "activity.supportTicket": function(newVal, oldVal){
       // console.log("activity.task", newVal, oldVal);
        if(newVal!=oldVal){
           if(newVal && this.init){

              if(newVal.project_id && this.activity.project==null)
                this.setProjectFrom(newVal);
              else if(newVal.project_id && this.activity.project.id!==newVal.project_id)
                 this.setProjectFrom(newVal);

            }
        }
      },
       "activity.workOrder": function(newVal, oldVal){
       // console.log("activity.task", newVal, oldVal);
        if(newVal!=oldVal){
           if(newVal && this.init){

              if(newVal.supportTicketId && this.activity.supportTicket==null)
                this.setSupportTicket(newVal);
              else if(newVal.supportTicketId && this.activity.supportTicket.id!==newVal.supportTicketId)
                 this.setSupportTicket(newVal);

            }
        }
      },
    },
    data: function(){
      return {
        init:false,        
        activity:{
          overtime:false,
          uploaded:false,
          createdOn:new Date(),
          name: null,
          project:null,
          task:null,
          taskStatus:null,
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
          supportTicket:null
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
        ] ,
        disabledDates: {   
          from: new Date() //new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        },
        showAdditionalFields:false,

        projectPopupParam:actPopup.projectPopupParam,
        taskPopupParam:actPopup.taskPopupParam,
        groupTaskPopupParam:actPopup.groupTaskPopupParam,
        actionTaskPopupParam:actPopup.actionTaskPopupParam,
        keytargetPopupParam:actPopup.keytargetPopupParam, 
        deliverablePopupParam:actPopup.deliverablePopupParam,   
        workOrderPopupParam:actPopup.workOrderPopupParam,
        supportTicketPopupParam:actPopup.supportTicketPopupParam, 
        requirementPopupParam:actPopup.requirementPopupParam, 
        hypotesisPopupParam:actPopup.hypotesisPopupParam,  
        problemPopupParam:actPopup.problemPopupParam,  
        processPopupParam:actPopup.processPopupParam, 
      };

    },
  }
</script>


