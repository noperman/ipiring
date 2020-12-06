const moment = {
  delayedClass(timeStart){
    var date = new Date();
    
    var timeStartSplit = timeStart.split(':')
    var start = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), timeStartSplit[0], timeStartSplit[1], '00');
    var end   = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours()+7, date.getUTCMinutes(), date.getUTCSeconds());
    let seconds = (end.getTime() - start.getTime()) / 1000;

    if(seconds < 1){
      return 'success'
    }else{
      return 'danger'
    }
  },
  delayed(timeStart){
    var date = new Date();

    const SECOND = 1;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    
    var timeStartSplit = timeStart.split(':')
    var start = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), timeStartSplit[0], timeStartSplit[1], '00');
    var end   = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours()+7, date.getUTCMinutes(), date.getUTCSeconds());

    let seconds = (end.getTime() - start.getTime()) / 1000;

    if(seconds < 1){
      seconds = (start.getTime() - end.getTime()) / 1000;
    }

    if(seconds < 1 * MINUTE)
      return seconds === 1 ? 'One sec' : seconds;
    if(seconds < 60 * MINUTE)
      return parseInt(seconds/MINUTE) + " minutes";
    if(seconds < 120 * MINUTE)
      return "an hour"
    if(seconds < 24 * HOUR){
      return parseInt(seconds/HOUR) + " hours";
    }
    return 'Not Set'
  }
}

export default moment