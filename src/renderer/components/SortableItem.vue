<template>
   <div @click.prevent="itemClicked()"> <span>{{name}}</span> <i v-show="dirrection==1" class="fa fa fa-sort-amount-asc"></i>  <i  v-show="dirrection==-1" class="fa fa fa-sort-amount-desc"></i></div>
</template>

<script>
  

  export default {
    props: ["name", "prop","dir"],
    name: 'SortableItem',
    created(){
    },
    data: function(){
      return {
        dirrection:this.dir,
        property:this.prop
      };

    },
    methods: {
      itemClicked () {
        let vm = this;
        if(this.dirrection==null)
          this.dirrection=1;
        else if(this.dirrection==1)
          this.dirrection=-1;
        else if(this.dirrection==-1)
          this.dirrection=null;

        this.$emit('sortChange',{prop:this.property, dir:this.dirrection});
      }
    }
  }
</script>

