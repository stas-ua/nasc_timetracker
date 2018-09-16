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
            <label for="token" class="sr-only">Token</label>
            <input type="text" id="token" class="form-control" placeholder="Token" required="" v-model="token">
            <br>
            
            <button class="btn  btn-outline-primary btn-block" type="button" @click.prevent="submit">Sign in</button>

        </div>

      </div>
     
    
    </form>
         
  </div>
</template>

<script>
  //import SystemInformation from './LandingPage/SystemInformation'
  

  export default {
    name: 'login-page',
    created(){
      //console.log(" in log in page");
    },
    data: function(){
      return {
        token: null,
      };

    },
    methods: {
      submit () {
        let vm =this;
        if(vm.token)
              vm.$store.dispatch("setUser",{name:"Me", token:this.token })
              .then(function(){
                  vm.$router.push({name: 'activity-list'});
              });//        "f9Y4xvgNKv1dzzBfoF7m"
      }
    }
  }
</script>

