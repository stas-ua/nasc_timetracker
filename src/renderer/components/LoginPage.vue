<template>
  <div>
    <form class="form-signin">
    
     <div class="row justify-content-sm-center">
        <div class="col-sm-4">
           <h1 class="h3 mb-3 font-weight-normal">Please log in</h1>
            <!-- <label for="inputEmail" class="sr-only">Email address</label>
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required=""> -->
            <!-- <label for="token" class="sr-only">Token</label>
            <input type="text" id="token" class="form-control" placeholder="Token" required="" v-model="token"> -->
             <label for="login" class="sr-only">Login</label>
             <input v-validate="'required'" type="text" id="login" name="login" class="form-control" placeholder="Login"  v-model="login">
             <span v-if="errors.first('login')" class="text-danger">{{ errors.first('login') }}</span> 
            <br>
             <label for="password" class="sr-only">Password</label>
             <input v-validate="'required'" type="password" id="password" name="password" class="form-control" placeholder="Password"  v-model="password">
             <span v-if="errors.first('password')" class="text-danger">{{ errors.first('password') }}</span> 
            <br>
            
            <button class="btn  btn-outline-primary btn-block" type="button" @click.prevent="submit">Sign in</button>

        </div>

      </div>
     
    
    </form>
         <vue-element-loading :active="isLoading" is-full-screen/>
  </div>
</template>

<script>
  //import SystemInformation from './LandingPage/SystemInformation'
  import VueElementLoading from 'vue-element-loading';
  import { getToken } from '../api/webService';
var log = require('electron-log');
  export default {
    name: 'login-page',
    components:{VueElementLoading},
    created(){
      //console.log(" in log in page");
    },
    data: function(){
      return {
        login: null,
        password:null,
        isLoading:false,
      };

    },
    methods: {
      submit () {
        let vm =this;
        vm.$validator.validateAll().then((result) => {
          if (result) {
            vm.isLoading = true;
            
            getToken(vm.login,vm.password).then(res=>{
              vm.isLoading = false;
              log.info(res);
               vm.$store.dispatch("setUser",{name:vm.login, token:res.token, systemUserId: res.systemUserId, customUserId:res.customUserId });
               vm.$router.push({name: 'activity-list'});
            }).catch(err=>{
              vm.isLoading = false;
              log.error("Error insign in", err);
              alert(err.message);
              
            });
          
          }
        });
        // if(vm.token)
        //       vm.$store.dispatch("setUser",{name:"Me", token:this.token })
        //       .then(function(){
        //           vm.$router.push({name: 'activity-list'});
        //       });
      }
    }
  }
</script>

