<template>
  <div v-if="init">
    
    <div class="d-flex justify-content-between mb-2">
      <h5>{{'Task Details'}}
    </h5>
<router-link  tag="a" :to="{ name: 'task-list' }" >
                        <i class="fa fa-share"></i> Back To Task List
              </router-link>
    <div>
      

        
    </div>
    
    
     
      
    </div>

    <div class="row">
      <div class="col">
        <div class="row">
          <div class="col-sm-2 text-muted text-sm-right">
              Project:
          </div>
           <div class="col-sm-10 text-sm-left">
             {{task.project_name}}
          </div>
        </div>
        <div class="row">
          <div class="col-sm-2 text-muted text-sm-right">
              Task Name:
          </div>
           <div class="col-sm-10 text-sm-left">
             {{task.name}}
          </div>
        </div>
        <div class="row">
          <div class="col-sm-2 text-muted text-sm-right">
              Description:
          </div>
           <div class="col-sm-10 text-sm-left">
             <pre>{{task.description}}</pre>            
          </div>
        </div>
         <div class="row">
          <div class="col-sm-2 text-muted text-sm-right">
              Start Day:
          </div>
           <div class="col-sm-10 text-sm-left">
             {{task.startDay|formatDate}}
          </div>
        </div>
        <div class="row">
          <div class="col-sm-2 text-muted text-sm-right">
              Priority:
          </div>
           <div class="col-sm-10 text-sm-left">
             {{task.priority}}
          </div>
        </div>
        
            <br/>
           
                 <router-link class="btn btn-outline-secondary " tag="button" :to="{ name: 'task-list' }" >
                        <i class="fa fa-reply"></i> Back
              </router-link>


      </div>
    </div> 

         

  </div>
</template>

<script>
  //import SystemInformation from './LandingPage/SystemInformation'
 // import axios from 'axios';


 import {toHHMMSSObj} from '../common/util';
  
 // const actPopup = JSON.parse(JSON.stringify(actPopupDef)); //we should make a deep copy of object because we will modify filter props
//console.log(actPopup.taskPopupParam);
  var log = require('electron-log');

  export default {
    components:{},
    props: ['dbId'],
    name: 'task-details',
    created(){
      let vm = this;
     // console.log(actPopup.taskPopupParam);
      if(this.dbId){
         vm.$db.tasks.findOne({_id:this.dbId}, function (err, doc) {
              //  console.log(doc);
                if(doc){
                    vm.task = doc;     
                    vm.init =true; 
                }
              });
      }else{
         vm.init      =true; 
      }


    },
    computed:{   
   },
    methods: {      
     
      quite(){
        //console.log("in quite");
        let vm = this;
            vm.$router.push({ name: 'activity-list' });
      },  

      toHHMMSS:toHHMMSSObj,
 
    },
    
    watch:{   
      
    },
    data: function(){
      return {
        init:false,        
        task:{
          name: null,
          project:null,
          project_name:null,
          sprintItem:null,
          deliverable:null,
          keytarget:null,
          executor:null,
          estimation:0.0,
          startDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
          endDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000 ),
          description:null,
          status:{id:1,text:"New"},      
          createdOn:null,
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
        activityTypeOptions:[
          {id:1,text:"Meeting/clarification"},
          {id:2,text:"Discussion"},
          {id:3,text:"Design"},
          {id:4,text:"Documentation (process doc/slides)"},
          {id:5,text:"Uat/testing"},
          {id:6,text:"Reporting/planning"},
          {id:7,text:"Bug-fixing"},
          {id:8,text:"review"},
          {id:9,text:"New dev"},
          {id:10,text:"Other"},
        ] ,
        
       };

    },
  }
</script>


