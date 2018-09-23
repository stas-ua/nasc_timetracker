<template>

  <b-modal   v-model="show"  :no-close-on-backdrop="true" :no-close-on-esc="true" size="lg" >
    <div slot="modal-header" class="w-100">
      <div class="d-flex justify-content-between">
        <h4>{{collectionName}}</h4>
        <a @click.prevent="cancel"><i class="fa fa-close"></i></a>
      </div>
    </div>
    <div class="row" >
        <div class="col ml-3 mr-3">
          <div class="input-group input-group-sm mb-3">
            <input type="text" class="form-control" placeholder="Type To Search..." aria-label="Search" aria-describedby="basic-addon2" v-model="searchPattern">
            <div class="input-group-append">
              <span class="input-group-text " id="basic-addon2" ><i class="fa fa-search"></i></span>
            </div>
          </div>
          <div v-if="init" style="overflow: auto; height:350px">
            <table class="table table-hover table-sm">
                <thead>
                    <tr>
                        <th :key="'col' + i" v-for="(col,i) in columnsConfig">{{col.caption}}</th>
                        <th>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="item._id" v-for="(item,j) in items">
                    
                        <td :key="'cell' + i + j" v-for="(col,i) in columnsConfig">{{item[col.key]}}</td>    
                        <td>

                            <div class="btn-group">
                              <button class="btn btn-sm btn-outline-secondary" @click.prevent="select(item)"> <i class="fa fa-check"></i>
                              </button>    
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
          </div>
          <div v-else class="row">
              <div class="col text-center">

                <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
              </div>
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
import _ from "lodash";

  export default {
    //components:{Datepicker},
     components: { 'b-modal': bModal,},
    directives: {
            'b-modal': bModalDirective
    },
    props: ['collectionName','filter', 'show', 'columnsConfig'],
    name: 'select-item-popup',
    created(){
     
     
    },
    data: function(){
      return {
        items:[],
        init:false,
        searchPattern:null,
        debouncedSearch: _.debounce(this.search, 500)
      };

    },
    methods: {
      select (item) {
        let vm = this;
        this.$emit('itemSelected', item);
      },
      cancel(){
         this.$emit('canceled');
      },
      search(val){


        let vm = this;
        if(!vm.show)
            return;
        if(!val){
              vm.init = false;
             vm.$db[vm.collectionName].find(vm.filter).limit(100).exec(  function (err, doc) {
                  //console.log(doc);
                  vm.items = doc;
                  vm.init = true;
                });
          }else{
            let filterExpr = [];
            let o;
            vm.columnsConfig.forEach(element => {
              if(element.searchable){
                  o = {};
                  o[element.key] = new RegExp(val,"i");
                  filterExpr.push(o);
              }
            });
            if(filterExpr.length==0){
                return;
            }
            vm.init = false;
            let resFilter = { $and: [vm.filter  , { $or: filterExpr}] };            
            vm.$db[vm.collectionName].find(resFilter).limit(100).exec( function (err, docs) {
                      //console.log(doc);
                      if(err){
                        console.error(err);
                      }else{
                          vm.items = docs;
                          vm.init = true;
                      }
                      
                    });

          }
        
      }

    },
    watch: {
      searchPattern:function(val){
        
          this.debouncedSearch(val);
      },
      show: function (val) {  
        let vm = this;        
        
        if(val){          
         // console.log("in popup show", this.collectionName);
          vm.$db[this.collectionName].find(vm.filter).limit(100).exec( function (err, doc) {
                 // console.log(doc);
                  vm.items = doc;
                  vm.init = true;
                });
        }else{
                 vm.items = [];
                  vm.init = false;
                  vm.searchPattern = null;                  
        }
      }
    }
  }
</script>

