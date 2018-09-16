import db from '../../datastore';
import sync from '../../service/syncService';



const state = {
  syncTaskId: null

}

const mutations = {
  SET_SYNC_TASK (state, payload) {
    state.syncTaskId = setInterval(sync.loadAll,30000);
  },
  RESET_SYNC_TASK (state) {
    clearInterval(state.syncTaskId);
    state.syncTaskId = null;
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
