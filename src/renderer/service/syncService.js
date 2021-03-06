import api from '../api';
import db from '../datastore';
import dbService from './dbService';
var log = require('electron-log');
import store from '../store';


function sliceData(data, name){
    let items = [];
    if(data.length>7000){

            //alert("Loaded more than 1000 elements!!!. only 1000 items will be saved")  ;
            log.warn("Loaded more than 7000 elements of " + name + "!!! Only 7000 items will be saved");
            items = data.slice(0,7000);
    }else{
        log.info("Loaded " + data.length + " elements of " + name + ".");
        items = data;
    }
    return items;
};

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
        db.users.remove({}, { multi: true }, function (err, numRemoved) {
        });
        db.sprintItems.remove({}, { multi: true }, function (err, numRemoved) {
        });
    },
    reloadAll(){

    },
    
    loadAll(){

        api.getUsers().then(function(result){    
            
            if(result && result.data ){
                db.users.remove({}, { multi: true }, function (err, numRemoved) {
                    if(err){
                        log.error("error in users updating process (nedb deletion)", err);
                    }else{
                        let items = sliceData(result.data, "users");
                        //console.log(items)
                        db.users.insert(items, function (err2) {
                            if(err2){
                                log.error("error in users updating process (nedb insert)", err2);
                            }
                            
                        });
                    }
                    
                });
           }
            
        }).catch((err)=>{
            log.error("getusers exception", err);
        });

        api.getSprintItems().then(function(result){    
            
            if(result && result.data ){
                db.sprintItems.remove({}, { multi: true }, function (err, numRemoved) {
                    if(err){
                        log.error("error in sprintItems updating process (nedb deletion)", err);
                    }else{
                        let items = sliceData(result.data, "sprintItems");
                        //console.log(items)
                        db.sprintItems.insert(items, function (err2) {
                            if(err2){
                                log.error("error in sprintItems updating process (nedb insert)", err2);
                            }
                            
                        });
                    }
                    
                });
           }
            
        }).catch((err)=>{
            log.error("get sprintItems exception", err);
        });


        api.getAllTasks().then(function(result){    
            
            if(result && result.data ){
                db.tasks.remove({}, { multi: true }, function (err, numRemoved) {
                    if(err){
                        log.error("error in tasks updating process (nedb deletion)", err);
                    }else{
                        let items = sliceData(result.data, "tasks");
                        //console.log(items)
                        db.tasks.insert(items, function (err2) {
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
                        let items = sliceData(result.data, "projects");
                        db.projects.insert(items, function (err2) {
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

        api.getAllProblems().then(function(result){   
            
            if(result && result.data ){
                db.problems.remove({}, { multi: true }, function (err, numRemoved) {
                    if(err){
                        log.error("error in problems updating process (nedb deletion)", err);
                    }else{
                        let items = sliceData(result.data, "problems");
                        db.problems.insert(items, function (err2) {
                            if(err2){
                                log.error("error in problems updating process (nedb insert)", err2);
                            }
                            
                        });
                    }
                    
                });
           }
            
        }).catch((err)=>{
            log.error("getAllProblems exception", err);
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
                        let items = sliceData(result.data, "deliverables");
                        db.deliverables.insert(items, function (err2) {
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
                        let items = sliceData(result.data, "groupTasks");
                        db.groupTasks.insert(items, function (err2) {
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
                        let items = sliceData(result.data, "hypotesis");
                        db.hypotesis.insert(items, function (err2) {
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
                        let items = sliceData(result.data, "processes");
                        db.processes.insert(items, function (err2) {
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
                        let items = sliceData(result.data, "requirements");
                        db.requirements.insert(items, function (err2) {
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
                        let items = sliceData(result.data, "supportTickets");
                        db.supportTickets.insert(items, function (err2) {
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
                        let items = sliceData(result.data, "taskActions");
                        db.taskActions.insert(items, function (err2) {
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
                        let items = sliceData(result.data, "workOrders");
                        db.workOrders.insert(items, function (err2) {
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
                        let items = sliceData(result.data, "keyTargets");
                        db.keyTargets.insert(items, function (err2) {
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
    },

    async reloadAllAsync(){
        return await Promise.all([
            this.loadUsersAsync(),
            this.loadKeyTargetsAsync(),
            this.loadSprintItemsAsync(),
            this.loadTasksAsync(),
            this.loadProjectsAsync(),
            this.loadProblemsAsync(),
            this.loadRequirementsAsync(),
            this.loadWorkOrdersAsync(),
            this.loadSupportTicketsAsync(),
           // this.loadTaskActionsAsync(),
            this.loadHypotesisAsync(),
            this.loadProcessesAsync(),
            this.loadGroupTasksAsync(),
            this.loadDeliverablesAsync(),
          ]).then(results=>{            
            store.dispatch("updateDataLoadingDate");
            return results;
          });
    },
    async loadUsersAsync(){

        let dbName = "users";

        try{

            let result = await api.getUsers();
            let items = [];
                
            if(!(result && result.data && result.data.length > 0)){    
                 log.warn("Server does not return data for "  + dbName);   
                 log.warn("Server response:"  + result); 
                 return null;    
                // throw new Error("Server does not return data for "  + dbName);
            }else{
                items = sliceData(result.data, dbName);            
            }               

            let remCount = await dbService.removeItemsAsync(dbName);
            let res = await dbService.insertItemsAsync(dbName, items);

         
            store.dispatch("setMessageState", dbName + " loaded");
            return items;

        }catch(err){
            log.error("Exception in get "+ dbName + " method.", err);
            store.dispatch("setMessageState","Error during loading " + dbName );
            return null;
        }
    },
    async loadKeyTargetsAsync(){

        let dbName = "keyTargets";

        try{

            let result = await api.getAllKeyTargets();
            let items = [];
                
            if(!(result && result.data && result.data.length > 0)){            
                log.warn("Server does not return data for "  + dbName);   
                log.warn("Server response:"  + result); 
                return null; 
            }else{
                items = sliceData(result.data, dbName);            
            }               

            let remCount = await dbService.removeItemsAsync(dbName);
            let res = await dbService.insertItemsAsync(dbName, items);
            //console.log(dbName + " loaded");
            store.dispatch("setMessageState", dbName + " loaded");
            return items;

        }catch(err){
            log.error("Exception in get "+ dbName + " method.", err);
            store.dispatch("setMessageState","Error during loading " + dbName );
            return null;
        }
    },
    async loadSprintItemsAsync(){

        let dbName = "sprintItems";

        try{

            let result = await api.getSprintItems();
            let items = [];
                
            if(!(result && result.data && result.data.length > 0)){  
                log.warn("Server does not return data for "  + dbName);   
                 log.warn("Server response:"  + result); 
                 return null; 
            }else{
                items = sliceData(result.data, dbName);            
            }               

            let remCount = await dbService.removeItemsAsync(dbName);
            let res = await dbService.insertItemsAsync(dbName, items);            
            store.dispatch("setMessageState", dbName + " loaded");
            return items;

        }catch(err){
            log.error("Exception in get "+ dbName + " method.", err);
            store.dispatch("setMessageState","Error during loading " + dbName );
            return null;
        }
    },
    async loadTasksAsync(){

        let dbName = "tasks";

        try{

            let result = await api.getAllTasks();
            let items = [];
                
            if(!(result && result.data && result.data.length > 0)){            
                log.warn("Server does not return data for "  + dbName);   
                log.warn("Server response:"  + result); 
                return null; 
            }else{
                items = sliceData(result.data, dbName);            
            }               

            let remCount = await dbService.removeItemsAsync(dbName);
            let res = await dbService.insertItemsAsync(dbName, items);
            store.dispatch("setMessageState", dbName + " loaded");
            return items;

        }catch(err){
            log.error("Exception in get "+ dbName + " method.", err);
            store.dispatch("setMessageState","Error during loading " + dbName );
            return null;
        }
    },
    async loadProjectsAsync(){

        let dbName = "projects";

        try{

            let result = await api.getAllProjects();
            let items = [];
                
            if(!(result && result.data && result.data.length > 0)){            
                log.warn("Server does not return data for "  + dbName);   
                log.warn("Server response:"  + result); 
                return null; 
            }else{
                items = sliceData(result.data, dbName);            
            }               

            let remCount = await dbService.removeItemsAsync(dbName);
            let res = await dbService.insertItemsAsync(dbName, items);
            store.dispatch("setMessageState", dbName + " loaded");
            return items;

        }catch(err){
            log.error("Exception in get "+ dbName + " method.", err);
            store.dispatch("setMessageState","Error during loading " + dbName );
            return null;
        }
    },
    async loadProblemsAsync(){

        let dbName = "problems";

        try{

            let result = await api.getAllProblems();
            let items = [];
                
            if(!(result && result.data && result.data.length > 0)){            
                log.warn("Server does not return data for "  + dbName);   
                log.warn("Server response:"  + result); 
                return null; 
            }else{
                items = sliceData(result.data, dbName);            
            }               

            let remCount = await dbService.removeItemsAsync(dbName);
            let res = await dbService.insertItemsAsync(dbName, items);
            store.dispatch("setMessageState", dbName + " loaded");
            return items;

        }catch(err){
            log.error("Exception in get "+ dbName + " method.", err);
            store.dispatch("setMessageState","Error during loading " + dbName );
            return null;
        }
    },
    async loadRequirementsAsync(){

        let dbName = "requirements";

        try{

            let result = await api.getAllRequirements();
            let items = [];
                
            if(!(result && result.data && result.data.length > 0)){            
                log.warn("Server does not return data for "  + dbName);   
                 log.warn("Server response:"  + result); 
                 return null; 
            }else{
                items = sliceData(result.data, dbName);            
            }               

            let remCount = await dbService.removeItemsAsync(dbName);
            let res = await dbService.insertItemsAsync(dbName, items);
            store.dispatch("setMessageState", dbName + " loaded");
            return items;

        }catch(err){
            log.error("Exception in get "+ dbName + " method.", err);
            store.dispatch("setMessageState","Error during loading " + dbName );
            return null;
        }
    },
    async loadWorkOrdersAsync(){

        let dbName = "workOrders";

        try{

            let result = await api.getAllWorkOrders();
            let items = [];
                
            if(!(result && result.data && result.data.length > 0)){            
                log.warn("Server does not return data for "  + dbName);   
                 log.warn("Server response:"  + result); 
                 return null; 
            }else{
                items = sliceData(result.data, dbName);            
            }               

            let remCount = await dbService.removeItemsAsync(dbName);
            let res = await dbService.insertItemsAsync(dbName, items);
            store.dispatch("setMessageState", dbName + " loaded");
            return items;

        }catch(err){
            log.error("Exception in get "+ dbName + " method.", err);
            store.dispatch("setMessageState","Error during loading " + dbName );
            return null;
        }
    },
    async loadSupportTicketsAsync(){

        let dbName = "supportTickets";

        try{

            let result = await api.getAllSupportTickets();
            let items = [];
                
            if(!(result && result.data && result.data.length > 0)){            
                log.warn("Server does not return data for "  + dbName);   
                 log.warn("Server response:"  + result); 
                 return null; 
            }else{
                items = sliceData(result.data, dbName);            
            }               

            let remCount = await dbService.removeItemsAsync(dbName);
            let res = await dbService.insertItemsAsync(dbName, items);
            store.dispatch("setMessageState", dbName + " loaded");
            return items;

        }catch(err){
            log.error("Exception in get "+ dbName + " method.", err);
            store.dispatch("setMessageState","Error during loading " + dbName );
            return null;
        }
    },
    async loadTaskActionsAsync(){

        let dbName = "taskActions";

        try{

            let result = await api.getAllTaskActions();
            let items = [];
                
            if(!(result && result.data && result.data.length > 0)){            
                log.warn("Server does not return data for "  + dbName);   
                 log.warn("Server response:"  + result); 
                 return null; 
            }else{
                items = sliceData(result.data, dbName);            
            }               

            let remCount = await dbService.removeItemsAsync(dbName);
            let res = await dbService.insertItemsAsync(dbName, items);
            store.dispatch("setMessageState", dbName + " loaded");
            return items;

        }catch(err){
            log.error("Exception in get "+ dbName + " method.", err);
            store.dispatch("setMessageState","Error during loading " + dbName );
            return null;
        }
    },
    async loadHypotesisAsync(){

        let dbName = "hypotesis";

        try{

            let result = await api.getAllHypotesis();
            let items = [];
                
            if(!(result && result.data && result.data.length > 0)){            
                log.warn("Server does not return data for "  + dbName);   
                 log.warn("Server response:"  + result); 
                 return null; 
            }else{
                items = sliceData(result.data, dbName);            
            }               

            let remCount = await dbService.removeItemsAsync(dbName);
            let res = await dbService.insertItemsAsync(dbName, items);
            store.dispatch("setMessageState", dbName + " loaded");
            return items;

        }catch(err){
            log.error("Exception in get "+ dbName + " method.", err);
            store.dispatch("setMessageState","Error during loading " + dbName );
            return null;
        }
    },
    async loadProcessesAsync(){

        let dbName = "processes";

        try{

            let result = await api.getAllProcesses();
            let items = [];
                
            if(!(result && result.data && result.data.length > 0)){            
                log.warn("Server does not return data for "  + dbName);   
                 log.warn("Server response:"  + result); 
                 return null; 
            }else{
                items = sliceData(result.data, dbName);            
            }               

            let remCount = await dbService.removeItemsAsync(dbName);
            let res = await dbService.insertItemsAsync(dbName, items);
            store.dispatch("setMessageState", dbName + " loaded");
            return items;

        }catch(err){
            log.error("Exception in get "+ dbName + " method.", err);
            store.dispatch("setMessageState","Error during loading " + dbName );
            return null;
        }
    },
    async loadGroupTasksAsync(){

        let dbName = "groupTasks";

        try{

            let result = await api.getAllGroupTasks();
            let items = [];
                
            if(!(result && result.data && result.data.length > 0)){            
                log.warn("Server does not return data for "  + dbName);   
                 log.warn("Server response:"  + result); 
                 return null; 
            }else{
                items = sliceData(result.data, dbName);            
            }               

            let remCount = await dbService.removeItemsAsync(dbName);
            let res = await dbService.insertItemsAsync(dbName, items);
            store.dispatch("setMessageState", dbName + " loaded");
            return items;

        }catch(err){
            log.error("Exception in get "+ dbName + " method.", err);
            store.dispatch("setMessageState","Error during loading " + dbName );
            return null;
        }
    },
    async loadDeliverablesAsync(){

        let dbName = "deliverables";

        try{

            let result = await api.getAllDeliverables();
            let items = [];
                
            if(!(result && result.data && result.data.length > 0)){            
                log.warn("Server does not return data for "  + dbName);   
                 log.warn("Server response:"  + result); 
                 return null; 
            }else{
                items = sliceData(result.data, dbName);            
            }               

            let remCount = await dbService.removeItemsAsync(dbName);
            let res = await dbService.insertItemsAsync(dbName, items);
            store.dispatch("setMessageState", dbName + " loaded");
            return items;

        }catch(err){
            log.error("Exception in get "+ dbName + " method.", err);
            store.dispatch("setMessageState","Error during loading " + dbName );
            return null;
        }
    },

    async loadTasks(){
       let result = await api.getAllTasks();
       return new Promise(function(resolve,reject){

        if(result && result.data ){
            db.tasks.remove({}, { multi: true }, function (err, numRemoved) {
                        if(err){
                            log.error("error in tasks updating process (nedb deletion)", err);
                            resolve();
                        }else{
                            let items = sliceData(result.data, "tasks");
                            //console.log(items)
                            db.tasks.insert(items, function (err2) {
                                if(err2){
                                    log.error("error in tasks updating process (nedb insert)", err2);
                                }
                                resolve();
                                
                            });
                        }
                        
                    });
            }else{
                resolve();
            }

       });      
            
            
      
    }

    


}