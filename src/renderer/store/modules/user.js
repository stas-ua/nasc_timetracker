import db from '../../datastore';
const userKey = "user";
var log = require('electron-log');

const state = {
  login: null,
  token:null,
  systemUserId:null,
  customUserId:null
}

const mutations = {
  SET_USER (state, payload) {    
    state.login = payload.login;
    state.token = payload.token;
    state.systemUserId = payload.systemUserId;
    state.customUserId = payload.customUserId;
    log.info("SET_USER", {login :payload.name, systemUserId: payload.systemUserId, customUserId:payload.customUserId});

  },
  RESET_USER (state) {
    state.login = null;
    state.token = null;
    state.systemUserId = null;
    state.customUserId = null;
    log.info("RESET_USER", payload);
  }
}

const actions = {
  setUser ({ commit }, user) {
    // do something async
    return new Promise((resolve, reject) => {
      user._key = userKey;
      db.common.update({ _key: userKey }, user, { upsert: true }, function (err, numReplaced, upsert) {
        if(err){
          console.log(err);
         // reject();
        } else{
          commit('SET_USER', user);
          commit("SET_SYNC_TASK"); 
        }  
        resolve();
      });
    });
    
    
  },
  resolveUser({state,commit}){
    return new Promise((resolve, reject) => {
      db.common.findOne({_key:userKey}, function (err, doc) {
        //console.log(doc);
        if(err){
          console.log(err);
         // reject();
        } else{
          if(doc){
            commit('SET_USER', doc);
            commit("SET_SYNC_TASK"); 
          }
            
          
        }  
        resolve();            
      });
    });
  },
  logOut({state,commit}){
    return new Promise((resolve, reject) => {
      db.common.remove({_key:userKey}, {}, function (err, numRemoved) {
        if(err){
          console.log(err);
         // reject();
        } else{
            commit('RESET_USER');
            commit("RESET_SYNC_TASK");
          
        }  
        resolve(); 
      });
      
    });
  }
}

export default {
  state,
  mutations,
  actions
}
