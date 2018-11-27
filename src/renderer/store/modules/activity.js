import db from '../../datastore';
import { verbose } from 'electron-log';
//import sync from '../../service/syncService';
var log = require('electron-log');


const state = {
  timerTaskId: null,
  activeActivity:null,
  timerStartedOnDate:null,
  savedOnDate:null,
  initialSpentTime:null,
}

const mutations = {
  RESET_STATE (state){
   // state.timerTaskId =null;
    state.activeActivity =null;
    state.timerStartedOnDate = null;
    state.savedOnDate = null;
    state.initialSpentTime = null;
  },
  INIT_STATE (state,payload){
    state.activeActivity =payload;
    state.timerStartedOnDate = new Date();
    state.savedOnDate = new Date();
    state.initialSpentTime = payload.spentTime ? payload.spentTime: 0.0;
  },
  SET_ACTIVITY_SPENT_TIME(state,payload){
    state.activeActivity.spentTime = payload;
  },
  SET_TIMER_TASK_ID(state,payload){
    state.timerTaskId = payload;
    log.info("SET_TIMER_TASK_ID", payload);
  },
  SET_SAVED_ON(state,payload){
    state.savedOnDate = payload;
  },
  // SET_TIMER_TASK (state) {    
  //   console.log(state);
  //   state.timerTaskId = setInterval(function(){

  //     state.activeActivity.spentTime = state.initialSpentTime + ( (new Date()).getTime() - state.timerStartedOnDate.getTime()) / 1000.0;

  //     if(( (new Date()).getTime() - state.savedOnDate.getTime())> (10*60*1000.0)){

  //       db.activities.update({_id:state.activeActivity._id}, { $set: { spentTime: state.activeActivity.spentTime } },{},function(err,num){
  //         if(err){
  //           log.error("Error in updating spentTime inside interval",err);
  //         }else{
  //           log.error("Spent time saved");
  //           state.savedOnDate = new Date();
  //         }
  //       });

  //     }

  //   },1000); //5min
  // },
  // RESET_TIMER_TASK (state) {
  //   clearInterval(state.timerTaskId);
  //   state.timerTaskId = null;
  // }
}

const updateDBAsync = async function (newTime){

}

const actions = {
  setTimer({state,commit}){
    let timerId = setInterval(function(){

     // console.log("Running");
      if(state.timerTaskId){
        commit("SET_ACTIVITY_SPENT_TIME", state.initialSpentTime + ( (new Date()).getTime() - state.timerStartedOnDate.getTime()) / 1000.0);

        if(( (new Date()).getTime() - state.savedOnDate.getTime())> (10*60*1000.0)){
  
          db.activities.update({_id:state.activeActivity._id}, { $set: { spentTime: state.activeActivity.spentTime } },{},function(err,num){
            if(err){
              log.error("Error in updating spentTime inside interval",err);
            }else{
              log.info("Spent time saved");
              commit("SET_SAVED_ON", new Date());
            }
          });          
        }
      }
      

    },1000);


    commit("SET_TIMER_TASK_ID", timerId);

  },
  startTimer ({ state, commit, dispatch}, activity) {   
    log.info("Start Timer", {_id:activity._id, name:activity.name});
    if(state.timerTaskId!=null){
      log.warn("New timer not alowed untill previos stoped");           
    }else{
      commit("INIT_STATE", activity);
      //commit("SET_TIMER_TASK");
      dispatch("setTimer");
      
    }  

  },
  async stopTimer({state,commit}){
    return new Promise(function(resolve,reject){
      db.activities.update({_id:state.activeActivity._id}, { $set: { spentTime: state.activeActivity.spentTime } },{},function(err,num){
        if(err){
          log.error("Error in updating spentTime on stopTimer",err);
        
        }else{
          
        }
          clearInterval(state.timerTaskId);
          commit("SET_TIMER_TASK_ID", null);
          resolve();
      });
    
    });
    
  },
}

export default {
  state,
  mutations,
  actions
}
