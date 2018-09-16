<template>
  <div>
    <!-- <img id="logo" src="~@/assets/logo.png" alt="electron-vue"> -->
    
    <div class="d-flex justify-content-between mb-3">
      <h3>{{dbId?'Edit Activity':'Create Activity'}}
    </h3>
    <router-link  tag="a" :to="{ name: 'activity-list' }" >
                        <i class="fa fa-share"></i> Back To Activity List
              </router-link>
    
     
      
    </div>

    <div class="row">
      <div class="col">
            <form>
                <div class="row">
                    <div class="col-6">
                        <div class="form-row">
                          
                            <div class="form-group col-sm">
                                <label class="col-form-label " for="price">Project <span class="text-danger">*</span></label>

                                
                              <div class="input-group mb-3">
                                <input name="project"  type="text" class="form-control "  :value="activity.project?activity.project.name:''" disabled  aria-describedby="button-addon2">
                                <div class="input-group-append">
                                  <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click.prevent="projectPopupParam.show=true">...</button>
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
                                            calendar-button-icon="fa fa-calendar"></datepicker>
                                <span v-if="errors.first('date')" class="text-danger">{{ errors.first('date') }}</span>
                            </div>
                                       
              
                        </div>  
                        <div class="form-row">                  

                            <div class="form-group col-sm">
                                <label class="col-form-label " for="price">Task <span class="text-danger">*</span></label>
                                
                                <div class="input-group mb-3">
                                  <input name="task"  type="text" class="form-control "  :value="activity.task?activity.task.name:''" disabled  aria-describedby="button-addon2">
                                  <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click.prevent="taskPopupParam.show=true">...</button>
                                  </div>
                                </div>                                
                       

                            </div>  
                            <div class="form-group col">
                                <label class="col-form-label " for="spentTime">Spent Time <span class="text-danger">*</span></label>

                                <!-- <input v-validate="'required'" name="spentTime" class="form-control " v-model="activity.spentTime" type="number"  placeholder="Spent Time"/> -->
                                <div  >
                                     <!-- <vue-timepicker   v-model="spentTimePicker" format="HH:mm:ss"></vue-timepicker> -->
                                </div>
                             
                               
                                <span v-if="errors.first('spentTime')" class="text-danger">{{ errors.first('spentTime') }}</span>

                            </div>
                              
                  
              
                        </div> 
                        <Timepicker v-model="spentTimePicker"></Timepicker>  
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
                          
                                            
               
                    </div>
                </div>             
   
                   
                        
                     
                    
                

            </form>
            <button class="btn btn-outline-primary btn-sm" @click.prevent="submit">Submit  <i class="fa fa-save"></i></button>
             <!-- <button class="btn btn-outline-secondary btn-sm" @click.prevent="submit">Cancel  <i class="fa fa-ban"></i></button> -->
                 <router-link class="btn btn-outline-secondary btn-sm" tag="button" :to="{ name: 'activity-list' }" >
                        <i class="fa fa-ban"></i> Cancel
              </router-link>
      </div>
    </div>

         <select-item-popup 
         key="taskPopup"
         v-bind="taskPopupParam"
         @itemSelected="selectItem(taskPopupParam, $event);  setProjectFromTask($event);" 
         @canceled="taskPopupParam.show=false;"></select-item-popup>

         <select-item-popup 
         key="projectPopup"
         v-bind="projectPopupParam"
         @itemSelected="selectItem(projectPopupParam, $event); clearTaskIfProjectSelected($event);" 
         @canceled="projectPopupParam.show=false;"></select-item-popup>

  </div>
</template>

<script>
  //import SystemInformation from './LandingPage/SystemInformation'
 // import axios from 'axios';
 import Datepicker from 'vuejs-datepicker';
  import SelectItemPopup from './SelectItemPopup';
  import Timepicker from './TimePicker';

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

      setProjectFromTask(item){
        let vm = this;
        console.log("svsdvsd");
        vm.$db.projects.findOne({id:item.project_id}, function (err, doc) {
                  //console.log(doc);
                  if(err){
                    console.error("error on set project", err);
                  }else{
                     vm.activity.project = doc;
                      console.log("vdvsdv");
                  }
                    
                });
      },
      clearTaskIfProjectSelected(item){
        if(this.activity.task.project_id!=item.id)
          this.activity.task = null;
      },
      toHHMMSS  (s) {
          var sec_num = s; 
          var hours   = Math.floor(sec_num / 3600);
          var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
          var seconds = sec_num - (hours * 3600) - (minutes * 60);

          // if (hours   < 10) {hours   = "0"+hours;}
          // if (minutes < 10) {minutes = "0"+minutes;}
          // if (seconds < 10) {seconds = "0"+seconds;}
           //return hours + ':' + minutes + ':' + seconds
          return {
             hours,
              minutes,
              seconds
            };
      }

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
        activity:{
          createdOn:new Date(),
          name: null,
          project:null,
          task:null,
          spentTime:0,
          date: new Date(),
          localId:null,
          deliverable:{
            id:null,
            text:null
          },
          activityType:null,
          problem:{
            id:null,
            text:null
          },
          process:{
            id:null,
            text:null
          },
          hypotesis:{
            id:null,
            text:null
          },
          requirement:{
            id:null,
            text:null
          },
          workOrder:{
            id:null,
            text:null
          },
          supportTicket:{
            id:null,
            text:null
          },
        }
        
      };

    },
  }
</script>

