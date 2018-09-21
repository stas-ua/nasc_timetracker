<template>
  <div>
    <!-- <img id="logo" src="~@/assets/logo.png" alt="electron-vue"> -->
   
    <div class="d-flex justify-content-between mb-3">
       <h5>Tasks
    </h5>
      <button class="btn btn-sm btn-outline-secondary" @click.prevent="addNew"> <i class="fa fa-plus"></i> Add
                            </button> 
    </div>

    <div class="row">
      <div class="col">
           <table class="table table-hover table-sm">
              <thead>
                  <tr>
                      <th>id</th>
                      <th>Name</th>
                      <th>Priority</th>
                      <th>ProjectId</th>
                      <th>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr :key="item.id" v-for="(item) in items">
                      <td>{{item.id}}</td>
                      <td>{{item.name}}</td>                            
                      <td>{{item.priority}}</td>   
                      <td>{{item.project_id}}</td> 
                      <td>

                         
                            <button class="btn btn-sm btn-outline-secondary" @click.prevent="editTask(item)"> <i class="fa fa-edit"></i>
                            </button>    
                         
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>
       <vue-element-loading :active="isLoading" is-full-screen/>  
  </div>
</template>

<script>
  //import SystemInformation from './LandingPage/SystemInformation'
     import VueElementLoading from 'vue-element-loading';
     import api from '../api';
       var log = require('electron-log');

  export default {
    name: 'created-by-me-task-list',
    components:{VueElementLoading},
    created(){
      let vm = this;

      api.getCreatedByMeTasks().then(result=>{
         if(result && result.data ){
            vm.items = result.data ;
         }else{
           log.error("No result from server");
         }
         vm.isLoading = false;
        
      }).catch(err=>{
          log.error("No result from server", err);
          vm.isLoading = false;
      })
      // vm.$db.tasks.find({}, function (err, docs) {
      //      vm.items = docs;
      //   });
      // axios.get(url, {
      //   params: {
      //     token:"f9Y4xvgNKv1dzzBfoF7m"
      //   }
      //   }).then(function(result){
      //     console.log(result);
      //     vm.$db.tasks.insert(result.data, function (err, newDocs) {
      //         console.log(newDocs);
      //       });
      //      vm.items = result.data;
      // });
    },
    data: function(){
      return {
        isLoading:true,
        items: [] //[{id:1, name:"SomeName"}, {id:2, name:"SomeName2"},{id:3, name:"SomeName3"},{id:4, name:"SomeName4"}]
      };

    },
    methods: {
      addNew(){
          this.$router.push({ name: 'task-create' });
      },
      editTask(item){
        this.$router.push({ path: `/taskEdit/${item._id}` });
      }
    }
  }
</script>

