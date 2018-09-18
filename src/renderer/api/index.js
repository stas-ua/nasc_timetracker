import axios from 'axios';
import store from '../store'

const BASE_URL =  'http://pm.nasctech.com/api/v1/custom_objects/';
const ENDPOINT = "timetracker/";
const GET_ALL_TASKS_URL = BASE_URL + ENDPOINT + 'get_tasks_new';
const GET_ALL_PROBLEMS_URL = BASE_URL + ENDPOINT +'timetracker/get_problems';
const GET_ALL_REQUIREMENTS_URL = BASE_URL + ENDPOINT +'get_requirement';
const GET_ALL_WO_URL = BASE_URL + ENDPOINT +'get_wo';
const GET_ALL_SS_URL = BASE_URL + ENDPOINT +'get_ss';
const GET_ALL_TASK_ACTIONS_URL = BASE_URL + ENDPOINT +'get_tasks_action';
const GET_ALL_HYPOTESIS_URL = BASE_URL + ENDPOINT +'get_hypotesis';
const GET_ALL_PROCESSES_URL = BASE_URL + ENDPOINT +'get_process';
const CREATE_ACTIVITY_URL = BASE_URL + ENDPOINT +'create_new_activity';
const GET_ALL_PROJECTS_URL = BASE_URL + ENDPOINT +'get_projects';
const GET_ALL_GROUP_TASKS_URL = BASE_URL + ENDPOINT +'get_group_tasks';
const GET_ALL_DELIVERABLES_URL = BASE_URL + ENDPOINT +'get_deliverables';
const GET_ALL_KEY_TARGET_URL = BASE_URL + "GetKeyTargets/" +'get_key_targets';

export default {

      async createActivityOnServer(activity){
          // console.log(store.state.user.token);
          activity.token = store.state.user.token;
          return axios.post(CREATE_ACTIVITY_URL, activity);
      },
     async getAllKeyTargets(){
        // console.log(store.state.user.token);
        return axios.get(GET_ALL_KEY_TARGET_URL, {
            params: {
              token: store.state.user.token//"f9Y4xvgNKv1dzzBfoF7m"
            }
            });
    },
    getAllTasks(){
       // console.log(store.state.user.token);
        return axios.get(GET_ALL_TASKS_URL, {
            params: {
              token: store.state.user.token//"f9Y4xvgNKv1dzzBfoF7m"
            }
            });
    },
    getAllProjects(){
        // console.log(store.state.user.token);
         return axios.get(GET_ALL_PROJECTS_URL, {
             params: {
               token: store.state.user.token//"f9Y4xvgNKv1dzzBfoF7m"
             }
             });
     },
     getAllProblems(){
        // console.log(store.state.user.token);
         return axios.get(GET_ALL_PROBLEMS_URL, {
             params: {
               token: store.state.user.token//"f9Y4xvgNKv1dzzBfoF7m"
             }
             });
     },
     getAllRequirements(){
        // console.log(store.state.user.token);
         return axios.get(GET_ALL_REQUIREMENTS_URL, {
             params: {
               token: store.state.user.token//"f9Y4xvgNKv1dzzBfoF7m"
             }
             });
     },
     getAllWorkOrders(){
        // console.log(store.state.user.token);
         return axios.get(GET_ALL_WO_URL, {
             params: {
               token: store.state.user.token//"f9Y4xvgNKv1dzzBfoF7m"
             }
             });
     },
     getAllSupportTickets(){
        // console.log(store.state.user.token);
         return axios.get(GET_ALL_SS_URL, {
             params: {
               token: store.state.user.token//"f9Y4xvgNKv1dzzBfoF7m"
             }
             });
     },
     getAllTaskActions(){
        // console.log(store.state.user.token);
         return axios.get(GET_ALL_TASK_ACTIONS_URL, {
             params: {
               token: store.state.user.token//"f9Y4xvgNKv1dzzBfoF7m"
             }
             });
     },
     getAllHypotesis(){
        // console.log(store.state.user.token);
         return axios.get(GET_ALL_HYPOTESIS_URL, {
             params: {
               token: store.state.user.token//"f9Y4xvgNKv1dzzBfoF7m"
             }
             });
     },
     getAllProcesses(){
        // console.log(store.state.user.token);
         return axios.get(GET_ALL_PROCESSES_URL, {
             params: {
               token: store.state.user.token//"f9Y4xvgNKv1dzzBfoF7m"
             }
             });
     },
     getAllGroupTasks(){
        // console.log(store.state.user.token);
         return axios.get(GET_ALL_GROUP_TASKS_URL, {
             params: {
               token: store.state.user.token//"f9Y4xvgNKv1dzzBfoF7m"
             }
             });
     },
     getAllDeliverables(){
        // console.log(store.state.user.token);
         return axios.get(GET_ALL_DELIVERABLES_URL, {
             params: {
               token: store.state.user.token//"f9Y4xvgNKv1dzzBfoF7m"
             }
             });
     },

}