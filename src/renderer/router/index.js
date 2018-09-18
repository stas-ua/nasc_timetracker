import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const  router =  new Router({
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  routes: [
    {
      path: '/login',
      name: 'login',
      component: require('@/components/LoginPage').default,
      meta:{
        private: false,
      }
    },
    {
      path: '/',
      name: 'activity-list-home',
      component: require('@/components/ActivityList').default  ,
      meta:{
        private: true,
      }
    },
    {
      path: '/activityList',
      name: 'activity-list',
      component: require('@/components/ActivityList').default  ,
      meta:{
        private: true,
      }    
    },
    {
      path: '/activityCreate',
      name: 'activity-create',
      component: require('@/components/ActivityEdit').default,
      //props:true,
      meta:{
        private: true,
      }
    },
    {
      path: '/activityEdit/:dbId',
      name: 'activity-edit',
      component: require('@/components/ActivityEdit').default,
      props:true,
      meta:{
        private: true,
      }
    },
    {
      path: '/taskList',
      name: 'task-list',
      component: require('@/components/TaskList').default ,
      meta:{
        private: true,
      }     
    },
    {
      path: '/projectList',
      name: 'project-list',
      component: require('@/components/ProjectList').default  ,
      meta:{
        private: true,
      }    
    },
    {
      path: '/processList',
      name: 'process-list',
      component: require('@/components/ProcessList').default   ,
      meta:{
        private: true,
      }   
    },
    {
      path: '/problemList',
      name: 'problem-list',
      component: require('@/components/ProblemList').default  ,
      meta:{
        private: true,
      }    
    },

    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next) => {
  //console.log("beforeEach", to);
  if(to.matched.some(function(it){return (it.meta && it.meta.private); })){
      if( store.state.user && store.state.user.token)
      {
        next();
        return;
      }        

       
      store.dispatch("resolveUser")
         .then(function(){
             if( store.state.user && store.state.user.token){
              next();
              return;
             }                
            else{
              //console.log("to login");
              next({ name: 'login' });
              return;
            }
         });
      
  }else{
    next();
    return;
  }

  
});
export default router;
