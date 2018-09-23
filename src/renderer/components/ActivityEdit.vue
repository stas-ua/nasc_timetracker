<template>
  <div>
    <!-- <img id="logo" src="~@/assets/logo.png" alt="electron-vue"> -->
    
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

                                
                              <div class="input-group">
                                <input name="project"  type="text" class="form-control "  :value="activity.project?activity.project.name:''" disabled  aria-describedby="button-addon_project">
                                <div class="input-group-append">
                                  <a href="#" class="input-group-text" v-show="activity.project?true:false" @click.prevent="activity.project = null;">x</a>
                                  <button class="btn btn-outline-secondary" type="button" id="button-addon_project" @click.prevent="projectPopupParam.show=true">...</button>
                                </div>
                              </div> 
                       

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
                                <label class="col-form-label " for="task">Task <span class="text-danger">*</span></label>
                                
                                <div class="input-group ">
                                  <input name="task"  type="text" class="form-control "  :value="taskComputed?taskComputed.name:''" disabled  aria-describedby="button-addon_task">
                                  <div class="input-group-append">
                                    <a href="#" class="input-group-text" v-show="taskComputed?true:false" @click.prevent="activity.task = null;">x</a>
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon_task" @click.prevent="taskPopupParam.show=true">...</button>
                                  </div>
                                </div>                                
                       

                            </div>  
                            <div class="form-group col-sm">
                                <label class="col-form-label " for="keytarget">Key Target </label>
                                
                                <div class="input-group ">
                                  <input name="keytarget"  type="text" class="form-control "  :value="activity.keytarget?activity.keytarget.name:''" disabled  aria-describedby="button-addon_keytarget">
                                  <div class="input-group-append">
                                    <a href="#" class="input-group-text" v-show="activity.keytarget?true:false" @click.prevent="activity.keytarget = null;">x</a>
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon_keytarget" @click.prevent="keytargetPopupParam.show=true">...</button>
                                  </div>
                                </div>                                
                       

                            </div>
                              
                  
              
                        </div> 
                         <div class="form-row">                  

                            <div class="form-group col-sm-6">
                                <label class="col-form-label " for="taskStatus">Task Status</label>
                                
                                <select v-model="activity.taskStatus" class="form-control " :disabled="activity.task==null">
                                    <option :key="el.id" v-for="el in taskStatusOptions" v-bind:value="el" >{{el.text}}</option>
                                </select>
                                    
                       

                            </div>  
                            
                            <!-- <div class="form-group col-sm">
                                <label class="col-form-label " for="price">Key Target </label>
                                
                                <div class="input-group ">
                                  <input name="keytarget"  type="text" class="form-control "  :value="activity.keytarget?activity.keytarget.name:''" disabled  aria-describedby="button-addon_keytarget">
                                  <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon_keytarget" @click.prevent="keytargetPopupParam.show=true">...</button>
                                  </div>
                                </div>                                
                       

                            </div> -->
                              
                  
              
                        </div> 
                        <!-- <div class="form-row">
                            
                        </div> -->
                        <div class="form-group">
                                <label class="col-form-label " for="spentTime">Spent Time <span class="text-danger">*</span></label>

                                <Timepicker v-model="spentTimePicker"></Timepicker> 

                         </div>
                         
                       
                       
                        <!-- <div class="row">
                          <div class="col-sm-4">
                                 <strong>Spent Time:</strong>
                          </div>
                           <div class="col-sm-8">
                               <Timepicker v-model="spentTimePicker"></Timepicker> 
                          </div>
                          </div>  -->
                        <div class="form-row">
                            <div class="form-group col">
                                <label class="col-form-label " for="name">Activity <span class="text-danger">*</span></label>

                                <textarea v-validate="'required'" name="name" class="form-control " v-model="activity.name" type="text"  placeholder="Type Description For Your Activity..">
                                </textarea>
                                <span v-if="errors.first('name')" class="text-danger">{{ errors.first('name') }}</span>
                               <!--  <span v-show="$v.package.name.$dirty || savePressed">
                                    <span class="alert-danger" v-if="!$v.package.name.required">{{$t('validation.required')}}</span>
                                    <span class="alert-danger" v-if="!$v.package.name.minLength">{{$t('validation.minLength',  {length: 2})}}</span>
                                </span> -->

                            </div>
                            
                        </div>
                        <div class="row">
                            <div class=col-sm-4>
                                <div class="form-group form-check">
                                  <input type="checkbox" class="form-check-input" id="Overtime" v-model="activity.overtime">
                                  <label class="form-check-label" for="Overtime">Overtime</label>
                                </div>
                                <!-- <div class="form-group form-check">
                                  <input type="checkbox" class="form-check-input" id="Uploaded">
                                  <label class="form-check-label" for="Uploaded">Uploaded</label>
                                </div> -->
                            </div>
                        </div>
                        
                          
                                            
               
                    </div>
                    <div class="col-sm-6" v-show="showAdditionalFields">
                        <div class="row">
                          <div class="col-sm-6">
                               <div class="form-group">
                                  <label class="col-form-label " for="groupTask">Group Task </label>                                    
                                  <div class="input-group">
                                    <input name="groupTask"  type="text" class="form-control "  :value="groupTaskComputed?groupTaskComputed.name:''" disabled  aria-describedby="button-addon_groupTask">
                                    <div class="input-group-append">
                                      <a href="#" class="input-group-text" v-show="groupTaskComputed?true:false" @click.prevent="activity.task = null;">x</a>
                                      <button class="btn btn-outline-secondary" type="button" id="button-addon_groupTask" @click.prevent="groupTaskPopupParam.show=true">...</button>
                                    </div>
                                  </div> 
                                </div> 
                                <div class="form-group">
                                  <label class="col-form-label " for="actionTask">Action Task </label>                                    
                                  <div class="input-group">
                                    <input name="actionTask"  type="text" class="form-control "  :value="actionTaskComputed?actionTaskComputed.name:''" disabled  aria-describedby="button-addon_actionTask">
                                    <div class="input-group-append">
                                      <a href="#" class="input-group-text" v-show="actionTaskComputed?true:false" @click.prevent="activity.task = null;">x</a>
                                      <button class="btn btn-outline-secondary" type="button" id="button-addon_actionTask" @click.prevent="actionTaskPopupParam.show=true">...</button>
                                    </div>
                                  </div> 
                                </div> 
                                <div class="form-group">
                                  <label class="col-form-label " for="deliverable">Deliverable </label>                                    
                                  <div class="input-group">
                                    <input name="deliverable"  type="text" class="form-control "  :value="activity.deliverable?activity.deliverable.name:''" disabled  aria-describedby="button-addon_deliverable">
                                    <div class="input-group-append">
                                       <a href="#" class="input-group-text" v-show="activity.deliverable?true:false" @click.prevent="activity.deliverable = null;">x</a>
                                      <button class="btn btn-outline-secondary" type="button" id="button-addon_deliverable" @click.prevent="deliverablePopupParam.show=true">...</button>
                                    </div>
                                  </div> 
                                </div> 
                          </div>
                          <div class="col-sm-6">
                                <div class="form-group">
                                  <label class="col-form-label " for="process">Process </label>                                    
                                  <div class="input-group">
                                    <input name="process"  type="text" class="form-control "  :value="activity.process?activity.process.name:''" disabled  aria-describedby="button-addon_process">
                                    <div class="input-group-append">
                                       <a href="#" class="input-group-text" v-show="activity.process?true:false" @click.prevent="activity.process = null;">x</a>
                                      <button class="btn btn-outline-secondary" type="button" id="button-addon_process" @click.prevent="processPopupParam.show=true">...</button>
                                    </div>
                                  </div> 
                                </div> 
                                <div class="form-group">
                                  <label class="col-form-label " for="problem">Problem </label>                                    
                                  <div class="input-group">
                                    <input name="problem"  type="text" class="form-control "  :value="activity.problem?activity.problem.name:''" disabled  aria-describedby="button-addon_problem">
                                    <div class="input-group-append">
                                       <a href="#" class="input-group-text" v-show="activity.problem?true:false" @click.prevent="activity.problem = null;">x</a>
                                      <button class="btn btn-outline-secondary" type="button" id="button-addon_problem" @click.prevent="problemPopupParam.show=true">...</button>
                                    </div>
                                  </div> 
                                </div> 
                                <div class="form-group">
                                  <label class="col-form-label " for="hypotesis">Hypotesis </label>                                    
                                  <div class="input-group">
                                    <input name="hypotesis"  type="text" class="form-control "  :value="activity.hypotesis?activity.hypotesis.name:''" disabled  aria-describedby="button-addon_hypotesis">
                                    <div class="input-group-append">
                                       <a href="#" class="input-group-text" v-show="activity.hypotesis?true:false" @click.prevent="activity.hypotesis = null;">x</a>
                                      <button class="btn btn-outline-secondary" type="button" id="button-addon_hypotesis" @click.prevent="hypotesisPopupParam.show=true">...</button>
                                    </div>
                                  </div> 
                                </div> 

                                <div class="form-group">
                                  <label class="col-form-label " for="requirement">Requirement </label>                                    
                                  <div class="input-group">
                                    <input name="requirement"  type="text" class="form-control "  :value="activity.requirement?activity.requirement.description:''" disabled  aria-describedby="button-addon_requirement">
                                    <div class="input-group-append">
                                      <a href="#" class="input-group-text" v-show="activity.requirement?true:false" @click.prevent="activity.requirement = null;">x</a>
                                      <button class="btn btn-outline-secondary" type="button" id="button-addon_requirement" @click.prevent="requirementPopupParam.show=true">...</button>
                                    </div>
                                  </div> 
                                </div> 
                                <div class="form-group">
                                  <label class="col-form-label " for="supportTicket">supportTicket </label>                                    
                                  <div class="input-group">
                                    <input name="supportTicket"  type="text" class="form-control "  :value="activity.supportTicket?activity.supportTicket.name:''" disabled  aria-describedby="button-addon_supportTicket">
                                    <div class="input-group-append">
                                      <a href="#" class="input-group-text" v-show="activity.supportTicket?true:false" @click.prevent="activity.supportTicket = null;">x</a>
                                      <button class="btn btn-outline-secondary" type="button" id="button-addon_supportTicket" @click.prevent="supportTicketPopupParam.show=true">...</button>
                                    </div>
                                  </div> 
                                </div> 
                                <div class="form-group">
                                  <label class="col-form-label " for="workOrder">Work Order </label>                                    
                                  <div class="input-group">
                                    <input name="workOrder"  type="text" class="form-control "  :value="activity.workOrder?activity.workOrder.name:''" disabled  aria-describedby="button-addon_workOrder">
                                    <div class="input-group-append">
                                        <a href="#" class="input-group-text" v-show="activity.workOrder?true:false" @click.prevent="activity.workOrder = null;">x</a>
                                      <button class="btn btn-outline-secondary" type="button" id="button-addon_v" @click.prevent="workOrderPopupParam.show=true">...</button>
                                    </div>
                                  </div> 
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

         <select-item-popup 
         key="taskPopup"
         v-bind="taskPopupParam"
         @itemSelected="selectItem(taskPopupParam, $event);  setProjectFrom($event);" 
         @canceled="taskPopupParam.show=false;"></select-item-popup>

         <select-item-popup 
         key="projectPopup"
         v-bind="projectPopupParam"
         @itemSelected="selectItem(projectPopupParam, $event); " 
         @canceled="projectPopupParam.show=false;"></select-item-popup>

          <select-item-popup 
         key="keytargetPopup"
         v-bind="keytargetPopupParam"
         @itemSelected="selectItem(keytargetPopupParam, $event); setProjectFromKeyTarget($event);" 
         @canceled="keytargetPopupParam.show=false;"></select-item-popup>

         <select-item-popup 
         key="groupTaskPopup"
         v-bind="groupTaskPopupParam"
         @itemSelected="selectItem(groupTaskPopupParam, $event); setProjectFrom($event);" 
         @canceled="groupTaskPopupParam.show=false;"></select-item-popup>

          <select-item-popup 
         key="actionTaskPopup"
         v-bind="actionTaskPopupParam"
         @itemSelected="selectItem(actionTaskPopupParam, $event); setProjectFrom($event);" 
         @canceled="actionTaskPopupParam.show=false;"></select-item-popup>

         <select-item-popup 
         key="deliverablePopup"
         v-bind="deliverablePopupParam"
         @itemSelected="selectItem(deliverablePopupParam, $event); setProjectFrom($event);" 
         @canceled="deliverablePopupParam.show=false;"></select-item-popup>

         <select-item-popup 
         key="processPopup"
         v-bind="processPopupParam"
         @itemSelected="selectItem(processPopupParam, $event); setProjectFrom($event);" 
         @canceled="processPopupParam.show=false;"></select-item-popup>
         
         <select-item-popup 
         key="problemPopup"
         v-bind="problemPopupParam"
         @itemSelected="selectItem(problemPopupParam, $event); setProcessFrom($event);" 
         @canceled="problemPopupParam.show=false;"></select-item-popup>

         <select-item-popup 
         key="hypotesisPopup"
         v-bind="hypotesisPopupParam"
         @itemSelected="selectItem(hypotesisPopupParam, $event); setProblemFrom($event);" 
         @canceled="hypotesisPopupParam.show=false;"></select-item-popup>

         <select-item-popup 
         key="requirementPopup"
         v-bind="requirementPopupParam"
         @itemSelected="selectItem(requirementPopupParam, $event); setProjectFrom($event);" 
         @canceled="requirementPopupParam.show=false;"></select-item-popup>

         <select-item-popup 
         key="supportTicketPopup"
         v-bind="supportTicketPopupParam"
         @itemSelected="selectItem(supportTicketPopupParam, $event); setProjectFrom($event);" 
         @canceled="supportTicketPopupParam.show=false;"></select-item-popup>

         <select-item-popup 
         key="workOrderPopup"
         v-bind="workOrderPopupParam"
         @itemSelected="selectItem(workOrderPopupParam, $event); setSupportTicket($event);" 
         @canceled="workOrderPopupParam.show=false;"></select-item-popup>

  </div>
</template>

<script>
  //import SystemInformation from './LandingPage/SystemInformation'
 // import axios from 'axios';
 import Datepicker from 'vuejs-datepicker';
  import SelectItemPopup from './SelectItemPopup';
  import Timepicker from './TimePicker';
   import {toHHMMSSObj} from '../common/util';
  var log = require('electron-log');

  export default {
    components:{Datepicker, SelectItemPopup, Timepicker},
    props: ['dbId'],
    name: 'activity-edit',
    created(){
      let vm = this;
     // console.log(this.dbId);
      if(this.dbId){
         vm.$db.activities.findOne({_id:this.dbId}, function (err, doc) {
                //console.log(doc);
                vm.activity = doc;                
              });
      }
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

        taskComputed(){
              if(this.activity.task && this.activity.task.groupTask)
                return null;
              else if(this.activity.task && this.activity.task.type == 2)
                return null;
             
              return this.activity.task;
          
        },
        groupTaskComputed(){
              if(this.activity.task && this.activity.task.groupTask)
                return this.activity.task;         
              
              return null;
          
        },
        actionTaskComputed(){
           
              if(this.activity.task && this.activity.task.type == 2)
                return this.activity.task;
              
              return null;
          
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


          vm.$db.activities.update({_id:this.dbId}, this.activity, { upsert: true }, function (err, numReplaced, upsert) {
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
                  }else{
                   
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
                  }else {
                    
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
                  }else{
                    
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
                  }else{
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
                  }else{
                     vm.activity.project = doc;
                     // console.log("vdvsdv");
                  }
                    
                });
      },
      clearAllProjectRelatedProperties(item){
        if(item){
            if(this.activity.task && this.activity.task.project_id!=item.id)
              this.activity.task = null;
            if(this.activity.keytarget && this.activity.keytarget.projectId!=item.id)
              this.activity.keytarget = null;
            if(this.activity.requirement && this.activity.requirement.project_id!=item.id)
              this.activity.requirement = null;
            if(this.activity.deliverable && this.activity.deliverable.project_id!=item.id)
              this.activity.deliverable = null;
        }else{

        }
        
      },
      toHHMMSS:toHHMMSSObj
    },
    watch:{
      "activity.project": function(newVal, oldVal){
        if(newVal!=oldVal){
          this.clearAllProjectRelatedProperties(newVal);
        }
      },
      "activity.task": function(newVal, oldVal){
        if(newVal!=oldVal){
           if(newVal){
            let status = this.taskStatusOptions.find(it=>it.id==newVal.statusId)
            this.activity.taskStatus = status;
            }else{
                this.activity.taskStatus = null;
            }
        }
      },
    },
    data: function(){
      return {
        taskPopupParam:{
          show:false,
          collectionName:"tasks",
          editedPropertyName:"task",
          columnsConfig:[
              {key:"id", caption:"Id"}, 
              {key:"project_name", caption:"Project", searchable:true},
              {key:"name", caption:"Task", searchable:true},
              {key:"priority", caption:"Priority"},
              {key:"statusName", caption:"Status"},
            ],
            filter:{},
        }, 
        groupTaskPopupParam:{
          show:false,
          collectionName:"groupTasks",
          editedPropertyName:"task",
          columnsConfig:[
              {key:"id", caption:"Id"}, 
              {key:"project_name", caption:"Project", searchable:true},
              {key:"name", caption:"Task", searchable:true},
              {key:"priority", caption:"Priority"},
              {key:"statusName", caption:"Status"},
            ],
            filter:{},
        },
        actionTaskPopupParam:{
          show:false,
          collectionName:"taskActions",
          editedPropertyName:"task",
          columnsConfig:[
              {key:"id", caption:"Id"}, 
              {key:"project_name", caption:"Project", searchable:true},
              {key:"name", caption:"Task", searchable:true},
              {key:"priority", caption:"Priority"},
              {key:"statusName", caption:"Status"},
            ],
            filter:{},
        }, 
         projectPopupParam:{
          show:false,
          collectionName:"projects",
          editedPropertyName:"project",
          columnsConfig:[
              {key:"id", caption:"Id"}, 
              {key:"name", caption:"Name", searchable:true},
            ],
             filter:{},
        },   
         keytargetPopupParam:{
          show:false,
          collectionName:"keyTargets",
          editedPropertyName:"keytarget",
          columnsConfig:[
              {key:"id", caption:"Id"}, 
              {key:"projectName", caption:"Project", searchable:true},
              {key:"name", caption:"Key Target", searchable:true}
            ],
            filter:{},
        }, 
         deliverablePopupParam:{
          show:false,
          collectionName:"deliverables",
          editedPropertyName:"deliverable",
          columnsConfig:[
              {key:"id", caption:"Id"}, 
              {key:"project_name", caption:"Project", searchable:true},
              {key:"name", caption:"Deliverable", searchable:true}
            ],
            filter:{},
        },   
        workOrderPopupParam:{
          show:false,
          collectionName:"workOrders",
          editedPropertyName:"workOrder",
          columnsConfig:[
              {key:"id", caption:"Id"}, 
              {key:"projectName", caption:"Project", searchable:true},
              {key:"name", caption:"WO", searchable:true}
            ],
            filter:{},
        },  
         supportTicketPopupParam:{
          show:false,
          collectionName:"supportTickets",
          editedPropertyName:"supportTicket",
          columnsConfig:[
              {key:"id", caption:"Id"}, 
              {key:"projectName", caption:"Project", searchable:true},
              {key:"categoryName", caption:"Category Name", searchable:true},
              {key:"severity", caption:"Severity", searchable:true},
               {key:"status", caption:"Status", searchable:true}
            ],
            filter:{},
        }, 
        requirementPopupParam:{
          show:false,
          collectionName:"requirements",
          editedPropertyName:"requirement",
          columnsConfig:[
              {key:"id", caption:"Id"}, 
              {key:"projectName", caption:"Project", searchable:true},
              {key:"burItemName", caption:"Bur Item", searchable:true},
              {key:"referenceNumber", caption:"Ref Number", searchable:true},
              {key:"description", caption:"Description", searchable:true}
            ],
            filter:{},
        }, 

        hypotesisPopupParam:{
          show:false,
          collectionName:"hypotesis",
          editedPropertyName:"hypotesis",
          columnsConfig:[
              {key:"id", caption:"Id"}, 
              {key:"burItemName", caption:"Bur Item", searchable:true},
              {key:"name", caption:"Hypotesis", searchable:true}
            ],
            filter:{},
        }, 

        problemPopupParam:{
          show:false,
          collectionName:"problems",
          editedPropertyName:"problem",
          columnsConfig:[
              {key:"id", caption:"Id"}, 
              {key:"process", caption:"Process", searchable:true},
              {key:"name", caption:"Problem", searchable:true},
              {key:"status", caption:"Status", searchable:false}
            ],
            filter:{},
        }, 

        processPopupParam:{
          show:false,
          collectionName:"processes",
          editedPropertyName:"process",
          columnsConfig:[
              {key:"id", caption:"Id"}, 
            //  {key:"projectName", caption:"Project", searchable:true},
              {key:"name", caption:"Process", searchable:true},
              {key:"category", caption:"Category", searchable:true},
              {key:"status", caption:"Status", searchable:false},
            ],
            filter:{},
        }, 


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
        
      };

    },
  }
</script>


