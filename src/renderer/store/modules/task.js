import db from '../../datastore';
import sync from '../../service/syncService';
var log = require('electron-log');


const state = {
  syncTaskId: null

}

const mutations = {
  SET_SYNC_TASK (state, payload) {
    state.syncTaskId = setInterval(function(){sync.reloadAllAsync();},1000*60*60); //60min
    log.info("SET_SYNC_TASK");
  },
  RESET_SYNC_TASK (state) {
    clearInterval(state.syncTaskId);
    state.syncTaskId = null;
    log.info("RESET_SYNC_TASK");
  }
}

const actions = {
  setSyncDataTask ({ state, commit, rootState  }) {
    if(rootState.user &&  rootState.user.token){
      if(!state.syncTaskId){
        commit("SET_SYNC_TASK"); 
      }
    }
         
    
  },
  resetSyncDataTask({state,commit}){
    commit("RESET_SYNC_TASK");
  },
}

export default {
  state,
  mutations,
  actions
}
