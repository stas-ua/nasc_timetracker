import axios from 'axios';
import store from '../store'

const BASE_URL =  'http://pm.nasctech.com/api/v1/custom_objects/';
const ENDPOINT = "timetracker/";
const ENDPOINT2 = "a_timetracker/";
const GET_ALL_TASKS_URL = BASE_URL + ENDPOINT + 'get_tasks_new';
const GET_ALL_PROBLEMS_URL = BASE_URL + ENDPOINT +'timetracker/get_problems';
const GET_ALL_REQUIREMENTS_URL = BASE_URL + ENDPOINT +'get_requirement';
const GET_ALL_WO_URL = BASE_URL + ENDPOINT +'get_wo';
const GET_ALL_SS_URL = BASE_URL + ENDPOINT +'get_ss';
const GET_ALL_TASK_ACTIONS_URL = BASE_URL + ENDPOINT +'get_tasks_action';
const GET_ALL_HYPOTESIS_URL = BASE_URL + ENDPOINT +'get_hypotesis';
const GET_ALL_PROCESSES_URL = BASE_URL + ENDPOINT +'get_process';

const GET_ALL_PROJECTS_URL = BASE_URL + ENDPOINT +'get_projects';
const GET_ALL_GROUP_TASKS_URL = BASE_URL + ENDPOINT +'get_group_tasks';
const GET_ALL_DELIVERABLES_URL = BASE_URL + ENDPOINT +'get_deliverables';

const GET_ALL_KEY_TARGET_URL = BASE_URL + ENDPOINT2 +'get_key_targets';

const CREATE_ACTIVITY_URL_V1 = BASE_URL + ENDPOINT +'create_new_activity';
const CREATE_ACTIVITY_URL = BASE_URL + ENDPOINT2 +'create_activity';

const CREATE_TASK_URL = BASE_URL + ENDPOINT2 +'create_task';

const GET_SPRINT_ITEMS = BASE_URL + ENDPOINT2 +'get_sprint_items';
const GET_USERS = BASE_URL + ENDPOINT2 +'get_users';
const GET_TASKS_CREATED_BY_ME = BASE_URL + ENDPOINT2 +'get_tasks_created_by_me';

export default {

    async createTaskOnServer(obj){
        // console.log(store.state.user.token);
        obj.token = store.state.user.token;
        return axios.post(CREATE_TASK_URL, obj);
    },

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
    async getCreatedByMeTasks(){
      // console.log(store.state.user.token);
      return axios.get(GET_TASKS_CREATED_BY_ME, {
          params: {
            token: store.state.user.token//"f9Y4xvgNKv1dzzBfoF7m"
          }
          });
  },
    async getSprintItems(){
      // console.log(store.state.user.token);
      return axios.get(GET_SPRINT_ITEMS, {
          params: {
            token: store.state.user.token//"f9Y4xvgNKv1dzzBfoF7m"
          }
          });
  },
  async getUsers(){
    // console.log(store.state.user.token);
    return axios.get(GET_USERS, {
        params: {
          token: store.state.user.token//"f9Y4xvgNKv1dzzBfoF7m"
        }
        });
},
    async getAllTasks(){
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