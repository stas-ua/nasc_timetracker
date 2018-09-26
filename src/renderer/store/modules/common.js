const state = {
  loading: false,
  messageState:null,
  messageStateTimerId:null,
  lastUpdatedDate:null,
}

const mutations = {
  RESET_LOADING (state) {
    state.loading = false;
  },
  SET_LOADING (state, val) {
    state.loading = val;
  },  
  SET_MESSAGE_STATE (state, val) {    
    state.messageState = val;
  },
  SET_LAST_UPDATED_DATE (state, val) {    
    state.lastUpdatedDate = val;
  },
  RESET_MESSAGE_STATE (state) {    
    state.messageState = null;
  },
  RESET_MESSAGE_STATE_TIMER (state) {    
    state.messageStateTimerId = null;
  },
  SET_MESSAGE_STATE_TIMER (state, val) {    
    state.messageStateTimerId = val;
  },

}

const actions = {
  updateDataLoadingDate ({ commit }) {
    
    commit('SET_LAST_UPDATED_DATE', new Date());
  },
  setLoading ({ commit }) {
    // do something async
    commit('SET_LOADING', true);
  },
  resetLoading({commit}){
    commit('RESET_LOADING');
  },
  setMessageState({commit,state}, msg){

     if(state.timerId){
       clearTimeout(state.timerId);
       commit('RESET_MESSAGE_STATE_TIMER');
     }

     commit('SET_MESSAGE_STATE',msg);

     let timerId = setTimeout(function(){
                      commit('RESET_MESSAGE_STATE');
                    }, 2000);
     commit('SET_MESSAGE_STATE_TIMER',timerId);

  }
}

export default {
  state,
  mutations,
  actions
}
