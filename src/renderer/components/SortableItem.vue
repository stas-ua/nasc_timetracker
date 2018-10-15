<style>
.el-dropdown-menu__item.dd-item{
  margin: 0;
  padding: 0;
  line-height: 0;
  font-size: 0.75rem;
}
.dd-item-cs{
  width: 100%;
  padding: 4px 7px 4px 7px;  
}
</style>
<template>
<div class="d-flex">
  <!-- @click.prevent="itemClicked()" @visibleChange="ddVisibleChange"-->
     <div class="" > <span>{{name}}</span> <i v-show="filterApllied" class="fa fa-filter text-muted"></i> <i v-show="dir==1" class="fa fa-sort-amount-asc text-muted"></i>  <i  v-show="dir==-1" class="fa fa-sort-amount-desc text-muted"></i></div>
     <div >
        <el-dropdown :hide-on-click="true" trigger="click" >
        <span class="el-dropdown-link"  @click="ddVisibleChange(true)">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="dd-item" :disabled="dir==1" key="sortAsk"><div class="dd-item-cs" @click="itemClicked(1)"><i  class="fa fa-sort-amount-asc"></i> Asc</div></el-dropdown-item>
          <el-dropdown-item  class="dd-item"  :disabled="dir==-1" key="sortDesc"><div class="dd-item-cs" @click="itemClicked(-1)"><i  class="fa fa-sort-amount-desc"></i> Desc</div></el-dropdown-item>
          <el-dropdown-item class="dd-item mb-1"  :disabled="dir==null" key="noSort"><div class="dd-item-cs" @click="itemClicked(null)"><i  class="fa fa-ban"></i> No Sort</div></el-dropdown-item>
          <div class="mr-2 ml-2 mb-1" v-if="filterOptions">
              <div><input type="checkbox" v-model="selectedAll"/> All</div>
              <div v-for="(item, i) in filterOptions" :key="i"><input type="checkbox" :id="item.value" :value="item.value" v-model="selectedFilterOptions"/> {{item.label}}</div>
              <!-- <div><input type="checkbox"/> Action 3</div> -->
          </div>
          
         
          <el-dropdown-item v-if="filterOptions" key="ok" class="dd-item text-right"><div class="dd-item-cs"  @click="setFilters">Ok</div></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

     </div>
     
</div>
</template>

<script>
  

  export default {
    props: ["name", "prop","dir", "filters", "filterValues"],
    name: 'SortableItem',
    created(){
    },
    data: function(){
      return {
       // dirrection:this.dir,
        property:this.prop,
        filterOptions: this.filters,
        selectedFilterOptions: this.filterValues||[],
      };
    },
    methods: {
      itemClicked (val) {
        let vm = this;
       
         // vm.dirrection=val;

        this.$emit('sortChange',{prop:this.property, dir:val});
      },
      setFilters(){
        this.$emit('filterValueChange',{prop:this.property, filterValues:this.selectedFilterOptions});
      },
      ddVisibleChange(val){
         //console.log("ddVisibleChange", val);
        if(val){
          //console.log("ddVisibleChange");
          this.selectedFilterOptions = this.filterValues||[];
        }

      }
    },
    computed:{
      filterApllied(){
        return this.filterOptions && this.filterValues && (this.filterOptions.length != this.filterValues.length);
      },
      selectedAll:{
        get () {
          return  this.selectedFilterOptions.length>0;
        },
        set (value) {
          if(value)
             this.selectedFilterOptions = this.filterOptions.map(fo=>fo.value);
           else
             this.selectedFilterOptions = [];
          
        }
      }
    }
  }
</script>

