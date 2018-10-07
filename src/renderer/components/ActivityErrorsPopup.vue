<template>

  <b-modal   v-model="show"  :no-close-on-backdrop="true" :no-close-on-esc="true" size="md" >
    <div slot="modal-header" class="w-100">
      <div class="d-flex justify-content-between ">
        <h4 class="text-danger">Errors!</h4>
        <a @click.prevent="cancel"><i class="fa fa-close"></i></a>
      </div>
    </div>
    <div class="row" >
        <div class="col ml-3 mr-3">         
          <div>An errors occurred during loading activities to the server.</div>
          <small class="text-warning ">Notice that only successfully uploaded activities are marked as "uploaded"(green color) </small>
          <div class="list-group mt-2">
            <a class="list-group-item  flex-column align-items-start "  :key="i" v-for="(obj,i) in errorItems">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Activity name: {{obj.activity.name}}<span class="small text-muted" v-if="obj.activity.task"> Task:{{ obj.activity.task.name}}</span></h5>
               
              </div>
              <div class="mb-1 text-danger">{{obj.error}}</div>
            </a>
            
          </div>
             
            
        </div>
    </div>
    

    <div slot="modal-footer" class="w-100">
        <!-- <div v-if="init" class="d-flex flex-row-reverse">
            <button class="btn btn-outline-primary" @click.prevent="submit"><span class="">{{$t('dict.save')}}</span> <i class="fa fa-save"></i></button>
            <button class="btn btn-outline-warning mr-2" @click.prevent="cancel"><span class="">{{$t('dict.cancel')}}</span> <i class="fa fa-cancel"></i></button>
           
        </div> -->
    </div>

</b-modal>
</template>

<script>
  //import SystemInformation from './LandingPage/SystemInformation'
 // import axios from 'axios';
 //import Datepicker from 'vuejs-datepicker';
 import bModal from 'bootstrap-vue/es/components/modal/modal';
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal';


  export default {
    //components:{Datepicker},
     components: { 'b-modal': bModal,},
    directives: {
            'b-modal': bModalDirective
    },
    props: ['errorItems', 'show' ],
    name: 'errors-popup',
    created(){
     
     
    },
    // data: function(){
    //   return {
    //     erros:[]
    //   };

    // },
    methods: {
      
      cancel(){
         this.$emit('canceled');        
      },

    },
    // watch: {
      
    //   show: function (val) {  
    
    //   }
    // }
  }
</script>

