import api from '../api';
import db from '../datastore';

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
                      console.error("error in task updating process", err);
                  }else{
                   // 
                  }
               
              });
            });
            console.log("Tasks updated");
        });
        api.getAllProjects().then(function(result){            
            result.data.forEach(element => {
              db.projects.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                      console.error("error in projects updating process", err);
                  }else{
                    
                  }
               
              });
            });
            console.log("projects updated");
        });
        api.getAllProblems().then(function(result){            
            result.data.forEach(element => {
              db.problems.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                      console.error("error in problems updating process", err);
                  }else{
                    
                  }
               
              });
            });
            console.log("problems updated");
        });
        api.getAllDeliverables().then(function(result){            
            result.data.forEach(element => {
              db.deliverables.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                      console.error("error in deliverables updating process", err);
                  }else{
                    //console.log("deliverables updated");
                  }
               
              });
            });
            console.log("deliverables updated");
        });
        api.getAllGroupTasks().then(function(result){            
            result.data.forEach(element => {
              db.groupTasks.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                      console.error("error in groupTasks updating process", err);
                  }else{
                    //console.log("groupTasks updated");
                  }
               
              });
            });
            console.log("groupTasks updated");
        });
        api.getAllHypotesis().then(function(result){            
            result.data.forEach(element => {
              db.hypotesis.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                      console.error("error in hypotesis updating process", err);
                  }else{
                    
                  }
               
              });
            });
            console.log("hypotesis updated");
        });
        api.getAllProcesses().then(function(result){            
            result.data.forEach(element => {
              db.processes.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                      console.error("error in processes updating process", err);
                  }else{
                  }
               
              });
            });
            console.log("processes updated");
        });
        api.getAllRequirements().then(function(result){            
            result.data.forEach(element => {
              db.requirements.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                      console.error("error in requirements updating process", err);
                  }else{
                  }
               
              });
            });
            console.log("requirements updated");
        });

        api.getAllSupportTickets().then(function(result){            
            result.data.forEach(element => {
              db.supportTickets.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                      console.error("error in supportTickets updating process", err);
                  }else{
                  }
               
              });
            });
            console.log("supportTickets updated");
        });
        api.getAllTaskActions().then(function(result){            
            result.data.forEach(element => {
              db.taskActions.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                      console.error("error in taskActions updating process", err);
                  }else{
                  }
               
              });
            });
            console.log("taskActions updated");
        });
        api.getAllWorkOrders().then(function(result){            
            result.data.forEach(element => {
              db.workOrders.update({id:element.id}, element, { upsert: true }, function (err, numReplaced, upsert) {
                  if(err){
                      console.error("error in workOrders updating process", err);
                  }else{
                  }
               
              });
            });
            console.log("workOrders updated");
        });
    }
}