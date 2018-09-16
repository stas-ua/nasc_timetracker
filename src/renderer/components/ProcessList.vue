<template>
  <div>
    <!-- <img id="logo" src="~@/assets/logo.png" alt="electron-vue"> -->
    <h3>Processes
    </h3>
    <div class="row">
      <div class="col">
           <table class="table table-hover table-sm">
              <thead>
                  <tr>
                      <th>id</th>
                      <th>Name</th>
                  </tr>
              </thead>
              <tbody>
                  <tr :key="item.id" v-for="(item) in items">
                      <td>{{item.id}}</td>
                      <td>{{item.name}}</td> 
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
    name: 'process-list',
    created(){
      let vm = this;
      vm.$db.processes.find({}, function (err, docs) {
           vm.items = docs;
        });
    },
    data: function(){
      return {
        items: [] //[{id:1, name:"SomeName"}, {id:2, name:"SomeName2"},{id:3, name:"SomeName3"},{id:4, name:"SomeName4"}]
      };

    },
    methods: {
      open () {
        
      }
    }
  }
</script>

