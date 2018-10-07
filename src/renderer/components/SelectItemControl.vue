<template>
<div>

  <!--   :value="itemSelected"
            @input="multiselectInput"
             :value-key="trackBy":name="name"
            @visible-change="dropDownOpen"  -->
  <div class="d-flex flex-row">
            <el-select           
           :value="itemSelected"
            @input="multiselectInput"
            :multiple="false"
            filterable
            remote
            clearable
            placeholder="Type to search"
            :remote-method="asyncFind"
            :loading="isLoading"
            :value-key="trackBy"
            :name="name"
            @visible-change="dropDownOpen"   
            reserve-keyword       
            size="small"
            class="w-100"
            >
            <el-option
              v-for="item in items"
              :key="item[trackBy]"
              :label="(item[label] && item[label].length>75)?item[label].substring(0, 75) + '...':item[label]"
              :value="item">
            </el-option>
          </el-select>
         
          <button class="btn btn-outline-secondary btn-sm" type="button" :id="'button-addon_' + name" @click.prevent="showPopup=true; $emit('showPopup', name)">...</button>
          
  </div> 


  
  <b-modal   v-model="showPopup"  :no-close-on-backdrop="true" :no-close-on-esc="true" size="lg" >
    <div slot="modal-header" class="w-100">
      <div class="d-flex justify-content-between">
        <h4>{{collectionName}}</h4>
        <a @click.prevent="close"><i class="fa fa-close"></i></a>
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
          <div v-if="!isLoading" style="overflow: auto; height:350px">
            <table class="table table-hover table-sm">
                <thead>
                    <tr>
                        <th :key="'col' + i" v-for="(col,i) in columnsVisible">{{col.caption}}</th>
                        <!-- <th>
                        </th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr :key="item._id" v-for="(item,j) in items" @click.prevent="select(item)">
                    
                        <td :key="'cell' + i + j" v-for="(col,i) in columnsVisible">{{item[col.key]}}</td>    
                        <!-- <td>

                            <div class="btn-group">
                              <button class="btn btn-sm btn-outline-secondary" @click.prevent="select(item)"> <i class="fa fa-check"></i>
                              </button>    
                            </div>
                        </td> -->
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
        <!-- <div v-if="isLoading" class="d-flex flex-row-reverse">
            <button class="btn btn-outline-primary" @click.prevent="submit"><span class="">{{$t('dict.save')}}</span> <i class="fa fa-save"></i></button>
            <button class="btn btn-outline-warning mr-2" @click.prevent="cancel"><span class="">{{$t('dict.cancel')}}</span> <i class="fa fa-cancel"></i></button>
           
        </div> -->
    </div>

  </b-modal>
</div>


</template>

<script>
  //import SystemInformation from './LandingPage/SystemInformation'
 // import axios from 'axios';
 //import Datepicker from 'vuejs-datepicker';
 import bModal from 'bootstrap-vue/es/components/modal/modal';
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal';
import _ from "lodash";
//  import Multiselect from 'vue-multiselect';
//   import  'vue-multiselect/dist/vue-multiselect.min.css';
//   import {  Select, Option } from 'element-ui';
 // import lang from 'element-ui/lib/locale/lang/en'
// import locale from 'element-ui/lib/locale'

// // configure language
// locale.use(lang);

  export default {
    //components:{Datepicker},
     components: { 'b-modal': bModal, 
      // [Select.name] : Select,
      //  [Option.name]:Option
     },
    directives: {
            'b-modal': bModalDirective
    },
    props: ['name', 'collectionName','filter', 'columnsConfig', 'value', 'limit'],
    name: 'select-item-control',
    created(){
     
     
      if(this.value ){
        this.items.push(this.value);
      }
      //console.log(this.value, this.items);
      this.init = true;

    },
    data: function(){
      return {
        items:[],
        isLoading:false,
        searchPattern:null,
        debouncedSearch: _.debounce(this.search, 500),
        showPopup:false,
        init : false,
       // itemSelected: this.value,
      };

    },
    computed:{
        itemSelected:{
          get(){
              return this.value;
          },
          set(value){
             this.$emit('input', value);
          }
        },
        trackBy(){
          if(!(this.columnsConfig && this.columnsConfig.length>0)){
              return 'id';
          }           

          let col =  this.columnsConfig.find(it=>{
            return it.trackBy
          });

          if(col && col.key)
          {
            return col.key;
          }           

          return 'id';
        },
        label(){
          if(!(this.columnsConfig && this.columnsConfig.length>0))
            return 'id';

          let col =  this.columnsConfig.find(it=>{
            return it.label
          });

          if(col && col.key)
          {
            return col.key;
          }           

          return 'id';
        },
        columnsVisible(){
          return this.columnsConfig.filter(x=>{return !x.hidden});
        }
    },
    methods: {
      // customLabel(item){
        
      //   return this.columnsConfig.reduce(function(acc, curr, i){
      //       return acc + ' - ' + item[curr.key];
      //   },'');;
      // },
      removeValue(){
        this.$emit('input', null);
      },
      select (item) {
        let vm = this;
        vm.showPopup = false;
        this.$emit('input', item);
      },
      close(){
          let vm = this;
        vm.showPopup = false;
         this.$emit('canceled');
      },
      search(val){


        let vm = this;
        vm.isLoading = true;
        // if(!vm.showPopup)
        //     return;
        if(!val){
              
             vm.$db[vm.collectionName].find(vm.filter).limit(vm.limit).exec(  function (err, doc) {
                  //console.log(doc);
                  vm.items = doc;
                  vm.isLoading = false;
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
                vm.isLoading = false;
                return;
            }         
            let resFilter = { $and: [vm.filter  , { $or: filterExpr}] };            
            vm.$db[vm.collectionName].find(resFilter).limit(vm.limit).exec( function (err, docs) {
                      //console.log(doc);
                      if(err){
                        console.error(err);
                      }else{
                          vm.items = docs;
                          vm.isLoading = false;
                      }
                      
                    });

        }
        
      },
      asyncFind (query) {
        this.isLoading = true;
       this.debouncedSearch(query);
      },
      multiselectInput(val){
        //console.log(val);
         this.$emit('input', val);
      },
      dropDownOpen(val){
          this.resetItems();
      },
      loadTopItems(){
        let vm = this;
        vm.isLoading = true;
        vm.$db[vm.collectionName].find(vm.filter).limit(vm.limit).exec( function (err, docs) {
                // console.log(doc);
                if(docs){
                     vm.items = docs
                    //  .map(it=>{
                    //     if(it[vm.label])
                    //         it[vm.label] = 
                    //    return 
                    //  });
                    vm.isLoading = false;
                }else{
                    vm.isLoading = false;
                }
               
              });
      },
      resetItems(){
        let vm = this;
        vm.items = [];
        vm.isLoading = false;
        vm.searchPattern = null;  
      }

    },
    watch: {
      searchPattern:function(val){
        
          this.debouncedSearch(val);
      },
      showPopup: function (val) {  
        let vm = this;        
        
        if(val){          
          //console.log(vm.filter);
           vm.loadTopItems();
        }else{
           vm.resetItems();                
        }
      },
      value:function(val){
        //console.log("fvsdvsvsvs", val);
        if(val  )
          this.items = [val];
         
      }
    },
    $_veeValidate: {
      // value getter
      value () {
        return this.value;
      },
      // name getter
      name () {
        return this.name;
      }
    },
  }
</script>


