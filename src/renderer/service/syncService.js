import api from '../api';
import db from '../datastore';
var log = require('electron-log');

export default {

    // setSyncTask(){
    //     var intervalID = setInterval(this.loadAll,30000);
    // },
    removeAll(){
        db.tasks.remove({}, { multi: true }, function (err, numRemoved) {
        });
        db.deliverables.remove({}, { multi: true }, function (err, numRemoved) {
        });
        db.groupTasks.remove({}, { multi: true }, function (err, numRemoved) {
        });
        db.hypotesis.remove({}, { multi: true }, function (err, numRemoved) {
        });
        db.problems.remove({}, { multi: true }, function (err, numRemoved) {
        });
        db.processes.remove({}, { multi: true }, function (err, numRemoved) {
        });
        db.projects.remove({}, { multi: true }, function (err, numRemoved) {
        });
        db.requirements.remove({}, { multi: true }, function (err, numRemoved) {
        });
        db.supportTickets.remove({}, { multi: true }, function (err, numRemoved) {
        });
        db.taskActions.remove({}, { multi: true }, function (err, numRemoved) {
        });
        db.workOrders.remove({}, { multi: true }, function (err, numRemoved) {
        });
    },
    loadAll(){

        api.getAllTasks().then(function(result){            
            result.data.forEach(element => {
              db.tasks.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                     // console.error("error in task updating process", err);
                      log.error("error in task updating process", err);
                  }else{
                   // 
                  }
               
              });
            });
            //console.log("Tasks updated");
            //log.info("Tasks updated");
        }).catch((err)=>{
            log.error("getAllTasks exception", err);
        });

        api.getAllProjects().then(function(result){            
            result.data.forEach(element => {
              db.projects.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                      //console.error("error in projects updating process", err);
                      log.error("Error in projects updating process", err);
                  }else{
                    
                  }
               
              });
            });
            //console.log("projects updated");
           // log.info("Projects updated");
        }).catch((err)=>{
            log.error("getAllProjects exception", err);
        });

        api.getAllProblems().then(function(result){            
            result.data.forEach(element => {
              db.problems.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                    log.error("error in problems updating process", err);
                  }else{
                    
                  }
               
              });
            });
            //log.info("problems updated");
        }).catch((err)=>{
            log.error("getAllProblems exception", err);
        });

        api.getAllDeliverables().then(function(result){            
            result.data.forEach(element => {
              db.deliverables.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                    log.error("error in deliverables updating process", err);
                  }else{
                    //console.log("deliverables updated");
                  }
               
              });
            });
            //log.info("deliverables updated");
        }).catch((err)=>{
            log.error("getAllDeliverables exception", err);
        });

        api.getAllGroupTasks().then(function(result){            
            result.data.forEach(element => {
              db.groupTasks.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                    log.error("error in groupTasks updating process", err);
                  }else{
                    //console.log("groupTasks updated");
                  }
               
              });
            });
           // log.info("groupTasks updated");
        }).catch((err)=>{
            log.error("getAllGroupTasks exception", err);
        });

        api.getAllHypotesis().then(function(result){            
            result.data.forEach(element => {
              db.hypotesis.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                    log.error("error in hypotesis updating process", err);
                  }else{
                    
                  }
               
              });
            });
            //log.info("hypotesis updated");
        }).catch((err)=>{
            log.error("getAllHypotesis exception", err);
        });

        api.getAllProcesses().then(function(result){            
            result.data.forEach(element => {
              db.processes.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                    log.error("error in processes updating process", err);
                  }else{
                  }
               
              });
            });
           // log.info("processes updated");
        }).catch((err)=>{
            log.error("getAllProcesses exception", err);
        });

        api.getAllRequirements().then(function(result){            
            result.data.forEach(element => {
              db.requirements.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                    log.error("error in requirements updating process", err);
                  }else{
                  }
               
              });
            });
           // log.info("requirements updated");
        }).catch((err)=>{
            log.error("getAllRequirements exception", err);
        });

        api.getAllSupportTickets().then(function(result){            
            result.data.forEach(element => {
              db.supportTickets.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                    log.error("error in supportTickets updating process", err);
                  }else{
                  }
               
              });
            });
            //log.info("supportTickets updated");
        }).catch((err)=>{
            log.error("getAllSupportTickets exception", err);
        });

        api.getAllTaskActions().then(function(result){            
            result.data.forEach(element => {
              db.taskActions.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                    log.error("error in taskActions updating process", err);
                  }else{
                  }
               
              });
            });
           // log.info("taskActions updated");
        }).catch((err)=>{
            log.error("getAllTaskActions exception", err);
        });

        api.getAllWorkOrders().then(function(result){            
            result.data.forEach(element => {
              db.workOrders.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                    log.error("error in workOrders updating process", err);
                  }else{
                  }
               
              });
            });
           // log.info("workOrders updated");
        }).catch((err)=>{
            log.error("getAllWorkOrders exception", err);
        });
    }
}