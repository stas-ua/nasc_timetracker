export default {
    projectPopupParam:{
        show:false,
        collectionName:"projects",
        editedPropertyName:"project",
        name:'project',
        limit:1000,
        columnsConfig:[
            {key:"id", caption:"Id", trackBy:true}, 
            {key:"name", caption:"Name", searchable:true, label:true},
          ],
        filter:{},
      },
      taskPopupParam:{
        show:false,
        collectionName:"tasks",
        name:"tasks",
        editedPropertyName:"task",
        name:'task',
        columnsConfig:[
            {key:"id", caption:"Id", trackBy:true}, 
            {key:"project_name", caption:"Project", searchable:true},
            {key:"name", caption:"Task", searchable:true, label:true},
            {key:"priority", caption:"Priority"},
            {key:"statusName", caption:"Status"},
          ],
          filter:{},
      }, 
      groupTaskPopupParam:{
        show:false,
        collectionName:"groupTasks",
        editedPropertyName:"task",
        name:'groupTask',
        columnsConfig:[
            {key:"id", caption:"Id", trackBy:true}, 
            {key:"project_name", caption:"Project", searchable:true},
            {key:"name", caption:"Task", searchable:true, label:true},
            {key:"priority", caption:"Priority"},
            {key:"statusName", caption:"Status"},
          ],
          filter:{},
      },
      actionTaskPopupParam:{
        show:false,
        collectionName:"taskActions",
        editedPropertyName:"task",
        name:'taskAction',
        columnsConfig:[
            {key:"id", caption:"Id", trackBy:true}, 
            {key:"project_name", caption:"Project", searchable:true},
            {key:"name", caption:"Task", searchable:true, label:true},
            {key:"priority", caption:"Priority"},
            {key:"statusName", caption:"Status"},
          ],
          filter:{},
      },   
       keytargetPopupParam:{
        show:false,
        collectionName:"keyTargets",
        editedPropertyName:"keytarget",
        name:'keytarget',
        columnsConfig:[
            {key:"id", caption:"Id", trackBy:true}, 
            {key:"projectName", caption:"Project", searchable:true},
            {key:"name", caption:"Key Target", searchable:true, label:true}
          ],
          filter:{ user:null, set_by:null },
      }, 
       deliverablePopupParam:{
        show:false,
        collectionName:"deliverables",
        editedPropertyName:"deliverable",
        name:'deliverable',
        columnsConfig:[
            {key:"id", caption:"Id", trackBy:true}, 
            {key:"project_name", caption:"Project", searchable:true},
            {key:"name", caption:"Deliverable", searchable:true, label:true}
          ],
          filter:{},
      },   
      workOrderPopupParam:{
        show:false,
        collectionName:"workOrders",
        editedPropertyName:"workOrder",
        name:'workOrder',
        columnsConfig:[
            {key:"id", caption:"Id", trackBy:true}, 
            {key:"projectName", caption:"Project", searchable:true},
            {key:"name", caption:"WO", searchable:true, label:true}
          ],
          filter:{},
      },  
       supportTicketPopupParam:{
        show:false,
        collectionName:"supportTickets",
        editedPropertyName:"supportTicket",
        name:'supportTicket',
        columnsConfig:[
            {key:"id", caption:"Id", trackBy:true}, 
            {key:"projectName", caption:"Project", searchable:true},
            {key:"categoryName", caption:"Category Name", searchable:true, label:true},
            {key:"severity", caption:"Severity", searchable:true},
             {key:"status", caption:"Status", searchable:true}
          ],
          filter:{},
      }, 
      requirementPopupParam:{
        show:false,
        collectionName:"requirements",
        editedPropertyName:"requirement",
        name:'requirement',
        columnsConfig:[
            {key:"id", caption:"Id", trackBy:true}, 
            {key:"projectName", caption:"Project", searchable:true},
            {key:"burItemName", caption:"Bur Item", searchable:true, label:true},
            {key:"referenceNumber", caption:"Ref Number", searchable:true},
            {key:"description", caption:"Description", searchable:true}
          ],
          filter:{},
      }, 

      hypotesisPopupParam:{
        show:false,
        collectionName:"hypotesis",
        editedPropertyName:"hypotesis",
        name:'hypotesis',
        columnsConfig:[
            {key:"id", caption:"Id", trackBy:true}, 
            {key:"burItemName", caption:"Bur Item", searchable:true},
            {key:"name", caption:"Hypotesis", searchable:true, label:true}
          ],
          filter:{},
      }, 

      problemPopupParam:{
        show:false,
        collectionName:"problems",
        editedPropertyName:"problem",
        name:'problem',
        columnsConfig:[
            {key:"id", caption:"Id", trackBy:true}, 
            {key:"process", caption:"Process", searchable:true},
            {key:"name", caption:"Problem", searchable:true, label:true},
            {key:"status", caption:"Status", searchable:false}
          ],
          filter:{},
      }, 

      processPopupParam:{
        show:false,
        collectionName:"processes",
        editedPropertyName:"process",
        name:'process',
        columnsConfig:[
            {key:"id", caption:"Id", trackBy:true}, 
          //  {key:"projectName", caption:"Project", searchable:true},
            {key:"name", caption:"Process", searchable:true, label:true},
            {key:"category", caption:"Category", searchable:true},
            {key:"status", caption:"Status", searchable:false},
          ],
          filter:{},
      },
}