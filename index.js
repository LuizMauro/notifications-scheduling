const CronJob = require("cron").CronJob
const dateFns= require("date-fns");

const notifications = [ 
  { name:"notficação 1", dayOfWeek: 2, hour: 14, minute: 00 },
  { name:"notficação 2", dayOfWeek: 5, hour: 14, minute: 00  },
  { name:"notficação 3", dayOfWeek: 5, hour: 14, minute: 30 },
  { name:"notficação 5", dayOfWeek: 5, hour: 15, minute: 00 },
  { name:"notficação 6", dayOfWeek: 5, hour: 14, minute: 30 },
  ]

new CronJob('0 */30 * * * *', () => {
  
  const dateCurrent = Date.now();

  console.log("Log -> ", dateCurrent);

  notifications.map((item) => {
    
    const scheduledDay = item.dayOfWeek;
    const getDayCurrent  =  dateFns.getDay(dateCurrent);

      if(scheduledDay === getDayCurrent){
        
        const scheduledHour = item.hour;
        const getHourCurrent = dateFns.getHours(dateCurrent);
      
        if( getHourCurrent === scheduledHour ){

          const scheduledMinute = item.minute;
          const getMinuteCurrent = dateFns.getMinutes(dateCurrent);

          if( getMinuteCurrent === scheduledMinute){
            console.log("Dia da semana ok!")
            console.log("Hora ok!");
            console.log("Minuto ok!")
            console.log("Enviando ...", item.name)
            console.log("------------------------")
          }
      }
    }
  });
}, null, true, "America/Sao_Paulo")



