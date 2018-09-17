<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark" v-if="isAuthentificated">
      <a class="navbar-brand" href="#">Timetracker</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto" >
          <li class="nav-item ">
             <router-link class="nav-link" tag="a" :to="{ path: '/activityList' }" >
                        <i class="fa fa-rocket"></i> Activities
              </router-link>
          </li>
          <li class="nav-item">
             <router-link class="nav-link" tag="a" :to="{ path: '/taskList' }" >
                        <i class="fa fa-bars"></i> Tasks
              </router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle"  href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Other</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">
          
              <router-link class="dropdown-item" tag="a" :to="{ path: '/projectList' }" >
                        <i class="fa fa-star"></i> Projects
              </router-link>
              <router-link class="dropdown-item" tag="a" :to="{ path: '/processList' }" >
                        <i class="fa fa-line-chart"></i> Processes
              </router-link>
              <router-link class="dropdown-item" tag="a" :to="{ path: '/problemList' }" >
                        <i class="fa fa-exclamation"></i> Problems
              </router-link>
            </div>
          </li>
       
        </ul>
        <div>
          <ul class="navbar-nav mr-auto" >
          <li class="nav-item ">
             <a class="nav-link" href="#" @click.prevent="removeAll" >
                        <i class="fa fa-trash"></i> Clear Store
              </a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="#"  @click.prevent="logOut" >
                        <i class="fa fa-sign-out"></i> Log Out
              </a>
          </li>
       
        </ul>
             <!-- <button  class="btn btn-sm btn-outline-secondary" @click.prevent="removeAll"><i class="fa fa-trash-o"></i> Clear All Dictionaries</button> -->
        </div>
        
        <!-- <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> -->
      </div>
    </nav>
  <!--   <main role="main">
     
    </main> -->
    
    <div class="container-fluid " id="appcontent"> 
        <div class="row m-3">
          <div class="col">
              <router-view></router-view>
          </div>
      
        </div>
      </div>

      <footer class="footer fixed-bottom">
      <div class="container d-flex justify-content-between">
        <span class="text-muted">Version: {{version}}</span>
        <span> {{footerMsg}} </span>
      </div>
    </footer>
 
  </div>
</template>

<script>
//import axios from 'axios';
import api from './api';
import sync from './service/syncService';
//const {app} = require('electron').remote;
import {version} from '../../package.json';
const {ipcRenderer} = require('electron');
var log = require('electron-log');

  export default {
    name: 'timetracker',
    data: function(){
      return {
        version : version,
        footerMsg: null
      };
    },
    created(){
      let vm = this;
     // console.log(app.getVersion());
      //if(this.isAuthentificated)
        //sync.setSyncTask();
        // vm.$electron.ipcRenderer.on('footer-msg', (event, data) => {
        //   this.footerMsg = data
        //   //console.log(data)
        // });
        ipcRenderer.on('main-process-message', function(event, text) {          
          this.footerMsg = text;
        });

        log.info("App started ", this.$store.state.user.login);
    },
    computed: {
        isAuthentificated(){
          if(this.$store.state.user && this.$store.state.user.token)
              return true;
          else
              return false;
        }
    },
    methods: {
      logOut(){
           let vm = this;
           vm.$store.dispatch("logOut")
              .then(function(){
                  vm.$router.push({name: 'login'});
              });//        "f9Y4xvgNKv1dzzBfoF7m"
      },
      removeAll(){
        sync.removeAll();
      },
      loadTasks (link) {
         let vm = this;
         api.getAllTasks().then(function(result){
            console.log("Tasks updated",result.data);
            result.data.forEach(element => {
              vm.$db.tasks.update(element, element, { upsert: true }, function (err, numReplaced, upsert) {
                // numReplaced = 1, upsert = { _id: 'id5', planet: 'Pluton', inhabited: false }
                // A new document { _id: 'id5', planet: 'Pluton', inhabited: false } has been added to the collection
              });
            });
        }
         );
        //  let url =   "http://pm.nasctech.com/api/v1/custom_objects/timetracker/get_tasks";
   
        // axios.get(url, {
        //   params: {
        //     token:"f9Y4xvgNKv1dzzBfoF7m"
        //   }
        //   }).then(function(result){
        //     // console.log(result);
        //     // vm.$db.tasks.insert(result.data, function (err, newDocs) {
        //     //     console.log(newDocs);
        //     //   });
        //     //  vm.items = result.data;
        //     //  // Removing all documents with the 'match-all' query
        //     // vm.$db.tasks.remove({}, { multi: true }, function (err, numRemoved) {

        //     // });
        //     console.log("Tasks updated",result.data);
        //     result.data.forEach(element => {
        //       vm.$db.tasks.update(element, element, { upsert: true }, function (err, numReplaced, upsert) {
        //         // numReplaced = 1, upsert = { _id: 'id5', planet: 'Pluton', inhabited: false }
        //         // A new document { _id: 'id5', planet: 'Pluton', inhabited: false } has been added to the collection
        //       });
        //     });
        // });
      }
    }
  }
</script>

<style>
  body {
  /* padding-top: 60px; */
  padding-top: 4em;
  
}
@media (max-width: 979px) {
  body {
    padding-top: 0px;
  }
}
#appcontent{
  margin-bottom: 30px;
}
.footer {
  width: 100%;
  height: 30px; /* Set the fixed height of the footer here */
  line-height: 30px; /* Vertically center the text there */
  background-color: #343a40;
}

</style>
