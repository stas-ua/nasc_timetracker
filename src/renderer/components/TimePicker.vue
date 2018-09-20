<template>
   <div class="row">
       <div class=" col-sm ">
          <div class="input-group ">
            <input @input="onInput('hours', $event.target.value)" class="form-control" name="hours" :value="value.hours" type="number" min="0" max="23" aria-describedby="addon-h"/>

            <div class="input-group-append">
              <span class="input-group-text" id="addon-h">HH</span>
            </div>
          </div>
      </div>
        <div class=" col-sm ">
          <div class="input-group">
            <input @input="onInput('minutes', $event.target.value)" class="form-control" name="minutes" :value="value.minutes" type="number" min="0" max="60" aria-describedby="addon-minutes"/>
            <div class="input-group-append">
              <span class="input-group-text" id="addon-minutes">MM</span>
            </div>
          </div>
      </div>
      <div class=" col-sm ">
 
          <div class="input-group">
                     <input @input="onInput('seconds', $event.target.value)" class="form-control" name="seconds" :value="value.seconds" type="number" min="0" max="60" aria-describedby="addon-seconds"/>
            <div class="input-group-append">
              <span class="input-group-text" id="addon-minutes">SS</span>
            </div>
          </div>
      </div>
     

     <!-- <div class="form-group col-sm">
          <div class="input-group mb-3">
            <input @input="onInput('hours', $event.target.value)" class="form-control" name="hours" :value="value.hours" type="number" min="0" max="23" aria-describedby="addon-h"/>

            <div class="input-group-append">
              <span class="input-group-text" id="addon-h">HH</span>
            </div>
          </div>
      </div>
        <div class="form-group col-sm">
          <div class="input-group mb-3">
            <input @input="onInput('minutes', $event.target.value)" class="form-control" name="minutes" :value="value.minutes" type="number" min="0" max="60" aria-describedby="addon-minutes"/>
            <div class="input-group-append">
              <span class="input-group-text" id="addon-minutes">MM</span>
            </div>
          </div>
      </div>
      <div class="form-group col-sm">
 
          <div class="input-group mb-3">
                     <input @input="onInput('seconds', $event.target.value)" class="form-control" name="seconds" :value="value.seconds" type="number" min="0" max="60" aria-describedby="addon-seconds"/>
            <div class="input-group-append">
              <span class="input-group-text" id="addon-minutes">SS</span>
            </div>
          </div>
      </div> -->
                                   
                          
                            <!-- <div class="form-group col-sm">
                                <label class="col-form-label " for="date">Hours </label>
                                <input @input="onInput('hours', $event.target.value)" class="form-control" name="hours" :value="value.hours" type="number" min="0" max="23"/>
                            </div>
                             <div class="form-group col-sm">
                                <label class="col-form-label " for="date">Minutes </label>
                                <input @input="onInput('minutes', $event.target.value)" class="form-control" name="minutes" :value="value.minutes" type="number" min="0" max="60"/>
                            </div>
                            <div class="form-group col-sm">
                                <label class="col-form-label " for="date">Seconds </label>
                                <input @input="onInput('seconds', $event.target.value)" class="form-control" name="seconds" :value="value.seconds" type="number" min="0" max="60"/>
                            </div>
                                        -->
              
   </div>  
</template>

<script>
  //import SystemInformation from './LandingPage/SystemInformation'
  

  export default {
    props: ["value"],
    name: 'TimePicker',
    created(){
      // let vm = this;
      // console.log(vm.value);
      // vm.val.hours = vm.value.hours;
      // vm.val.minutes = vm.value.minutes;
      // vm.val.seconds = vm.value.seconds;
    },
    data: function(){
      return {
        // val:{
        //   hours:0,
        //   minutes:0,
        //   seconds:0,
        // }
        
      };

    },
    methods: {
      onInput (prop,val) {
        let vm = this;
        let obj = {
            hours: vm.value.hours,
            minutes: vm.value.minutes,
            seconds: vm.value.seconds,
                    };
        obj[prop] = val;
         this.$emit('input',obj);
      }
    }
  }
</script>

