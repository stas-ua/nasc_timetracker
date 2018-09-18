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
        db.keyTargets.remove({}, { multi: true }, function (err, numRemoved) {
        });
    },
    loadAll(){

        api.getAllTasks().then(function(result){    
            
            if(result && result.data ){
                db.tasks.remove({}, { multi: true }, function (err, numRemoved) {
                    if(err){
                        log.error("error in tasks updating process (nedb deletion)", err);
                    }else{
                        db.tasks.insert(result.data, function (err2) {
                            if(err2){
                                log.error("error in tasks updating process (nedb insert)", err2);
                            }
                            
                        });
                    }
                    
                });
           }
            
        }).catch((err)=>{
            log.error("getAllTasks exception", err);
        });

        api.getAllProjects().then(function(result){   
            
            if(result && result.data ){
                db.projects.remove({}, { multi: true }, function (err, numRemoved) {
                    if(err){
                        log.error("error in projects updating process (nedb deletion)", err);
                    }else{
                        db.projects.insert(result.data, function (err2) {
                            if(err2){
                                log.error("error in projects updating process (nedb insert)", err2);
                            }
                            
                        });
                    }
                    
                });
           }
            
        }).catch((err)=>{
            log.error("getAllProjects exception", err);
        });

        // api.getAllProblems().then(function(result){            
        //     result.data.forEach(element => {
        //       db.problems.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
        //           if(err){
        //             log.error("error in problems updating process", err);
        //           }else{
                    
        //           }
               
        //       });
        //     });
        //     //log.info("problems updated");
        // }).catch((err)=>{
        //     log.error("getAllProblems exception", err);
        // });

        api.getAllDeliverables().then(function(result){     
            if(result && result.data ){
                db.deliverables.remove({}, { multi: true }, function (err, numRemoved) {
                    if(err){
                        log.error("error in deliverables updating process (nedb deletion)", err);
                    }else{
                        db.deliverables.insert(result.data, function (err2) {
                            if(err2){
                                log.error("error in deliverables updating process (nedb insert)", err2);
                            }
                            
                        });
                    }
                    
                });
           }        
            
        }).catch((err)=>{
            log.error("getAllDeliverables exception", err);
        });

        api.getAllGroupTasks().then(function(result){      
            if(result && result.data ){
                db.groupTasks.remove({}, { multi: true }, function (err, numRemoved) {
                    if(err){
                        log.error("error in groupTasks updating process (nedb deletion)", err);
                    }else{
                        db.groupTasks.insert(result.data, function (err2) {
                            if(err2){
                                log.error("error in groupTasks updating process (nedb insert)", err2);
                            }
                            
                        });
                    }
                    
                });
           }      
           
        }).catch((err)=>{
            log.error("getAllGroupTasks exception", err);
        });

        api.getAllHypotesis().then(function(result){   
            if(result && result.data ){
                db.hypotesis.remove({}, { multi: true }, function (err, numRemoved) {
                    if(err){
                        log.error("error in hypotesis updating process (nedb deletion)", err);
                    }else{
                        db.hypotesis.insert(result.data, function (err2) {
                            if(err2){
                                log.error("error in hypotesis updating process (nedb insert)", err2);
                            }
                            
                        });
                    }
                    
                });
           }         
           
        }).catch((err)=>{
            log.error("getAllHypotesis exception", err);
        });

        api.getAllProcesses().then(function(result){         
            if(result && result.data ){
                db.processes.remove({}, { multi: true }, function (err, numRemoved) {
                    if(err){
                        log.error("error in processes updating process (nedb deletion)", err);
                    }else{
                        db.processes.insert(result.data, function (err2) {
                            if(err2){
                                log.error("error in processes updating process (nedb insert)", err2);
                            }
                            
                        });
                    }
                    
                });
           }    
            
        }).catch((err)=>{
            log.error("getAllProcesses exception", err);
        });

        api.getAllRequirements().then(function(result){  
            if(result && result.data ){
                db.requirements.remove({}, { multi: true }, function (err, numRemoved) {
                    if(err){
                        log.error("error in requirements updating process (nedb deletion)", err);
                    }else{
                        db.requirements.insert(result.data, function (err2) {
                            if(err2){
                                log.error("error in requirements updating process (nedb insert)", err2);
                            }
                            
                        });
                    }
                    
                });
           }           
            
        }).catch((err)=>{
            log.error("getAllRequirements exception", err);
        });

        api.getAllSupportTickets().then(function(result){   
            if(result && result.data ){
                db.supportTickets.remove({}, { multi: true }, function (err, numRemoved) {
                    if(err){
                        log.error("error in supportTickets updating process (nedb deletion)", err);
                    }else{
                        db.supportTickets.insert(result.data, function (err2) {
                            if(err2){
                                log.error("error in supportTickets updating process (nedb insert)", err2);
                            }
                            
                        });
                    }
                    
                });
           }           
            
        }).catch((err)=>{
            log.error("getAllSupportTickets exception", err);
        });

        api.getAllTaskActions().then(function(result){   
            if(result && result.data ){
                db.taskActions.remove({}, { multi: true }, function (err, numRemoved) {
                    if(err){
                        log.error("error in taskActions updating process (nedb deletion)", err);
                    }else{
                        db.taskActions.insert(result.data, function (err2) {
                            if(err2){
                                log.error("error in taskActions updating process (nedb insert)", err2);
                            }
                            
                        });
                    }
                    
                });
           }         
            
        }).catch((err)=>{
            log.error("getAllTaskActions exception", err);
        });

        api.getAllWorkOrders().then(function(result){        
            if(result && result.data ){
                db.workOrders.remove({}, { multi: true }, function (err, numRemoved) {
                    if(err){
                        log.error("error in workOrders updating process (nedb deletion)", err);
                    }else{
                        db.workOrders.insert(result.data, function (err2) {
                            if(err2){
                                log.error("error in workOrders updating process (nedb insert)", err2);
                            }
                            
                        });
                    }
                    
                });
           }    
        }).catch((err)=>{
            log.error("getAllWorkOrders exception", err);
        });

        api.getAllKeyTargets().then(function(result){     
           // console.log(result) ; 
           if(result && result.data ){
                db.keyTargets.remove({}, { multi: true }, function (err, numRemoved) {
                    if(err){
                        log.error("error in keyTargets updating process (nedb deletion)", err);
                    }else{
                        db.keyTargets.insert(result.data, function (err2) {
                            if(err2){
                                log.error("error in keyTargets updating process (nedb insert)", err2);
                            }
                            
                        });
                    }
                    
                });
           }
        }).catch((err)=>{
            log.error("getAllKeyTargets exception", err);
        });
    }
}