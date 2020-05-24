const CronJob = require("cron").CronJob
const dateFns= require("date-fns");
const fetch = require('node-fetch');

const notifications = [ 
  { name:"notficação 1", body: "body notification 1", dayOfWeek: 2, hour: 14, minute: 00 },
  { name:"notficação 2", body: "body notification 2", dayOfWeek: 6, hour: 22, minute: 17  },
  { name:"notficação 3", body: "body notification 3", dayOfWeek: 6, hour: 22, minute: 18 },
  { name:"notficação 4", body: "body notification 4", dayOfWeek: 6, hour: 22, minute: 19 },
  { name:"notficação 5", body: "body notification 5", dayOfWeek: 6, hour: 22, minute: 20 },
  ]

  sendPushNotification = async (item) => {
    const message = {
      to: "ExponentPushToken[VP4zBCEcrzuOK6VFudF4qd]",
      sound: 'default',
      title: item.name,
      body: item.body,
      data: { data: 'CONTEUDO' },
      _displayInForeground: true,
    };
    
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    
  };
  
new CronJob('0 * * * * *', () => {
  
  const dateCurrent = Date.now();

  console.log("Log -> ", dateCurrent);

  notifications.map( async (item) => {
    
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
            console.log("Enviando notificação ...", item.name)
            sendPushNotification(item);
            console.log("------------------------")
          }
      }
    }
  });
}, null, true, "America/Sao_Paulo")



