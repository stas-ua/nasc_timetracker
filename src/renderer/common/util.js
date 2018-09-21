
export function toHHMMSS(s){
    // var sec_num = s; 
         let o = toHHMMSSObj(s);
           var hours   = o.hours;
           var minutes = o.minutes;
           var seconds = o.seconds;        

          if (hours   < 10) {hours   = "0"+hours;}
          if (minutes < 10) {minutes = "0"+minutes;}
          if (seconds < 10) {seconds = "0"+seconds;}

          return hours + ':' + minutes + ':' + seconds;
}

export function  toHHMMSSObj  (s) {
    
    var sec_num = s; 
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = Math.round(sec_num - (hours * 3600) - (minutes * 60));

    // if (hours   < 10) {hours   = "0"+hours;}
    // if (minutes < 10) {minutes = "0"+minutes;}
    // if (seconds < 10) {seconds = "0"+seconds;}
     //return hours + ':' + minutes + ':' + seconds
    return {
       hours,
        minutes,
        seconds
      };
}