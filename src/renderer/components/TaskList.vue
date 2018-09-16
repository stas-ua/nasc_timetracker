<template>
  <div>
    <!-- <img id="logo" src="~@/assets/logo.png" alt="electron-vue"> -->
    <h3>Tasks
    </h3>
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-sm btn-outline-secondary"> <i class="fa fa-plus"></i> Add
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

                         
                            <button class="btn btn-sm btn-outline-secondary"> <i class="fa fa-edit"></i>
                            </button>    
                         
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>
         
  </div>
</template>

<script>
  //import SystemInformation from './LandingPage/SystemInformation'
  

  export default {
    name: 'task-list',
    created(){
      let vm = this;
      let url =   "http://pm.nasctech.com/api/v1/custom_objects/timetracker/get_tasks";
      vm.$db.tasks.find({}, function (err, docs) {
           vm.items = docs;
        });
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
        items: [] //[{id:1, name:"SomeName"}, {id:2, name:"SomeName2"},{id:3, name:"SomeName3"},{id:4, name:"SomeName4"}]
      };

    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

