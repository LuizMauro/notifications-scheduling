const CronJob = require("cron").CronJob
const dateFns= require("date-fns");
const fetch = require('node-fetch');


const notifications = [ 
  { name:"notficação 1", body: "body notification 1", dayOfWeek: 2, hour: 14, minute: 00 },
  { name:"notficação 2", body: "body notification 2", dayOfWeek: 6, hour: 23, minute: 44  },
  { name:"notficação 3", body: "body notification 3", dayOfWeek: 6, hour: 23, minute: 45 },
  { name:"notficação 4", body: "body notification 4", dayOfWeek: 6, hour: 23, minute: 45 },
  { name:"notficação 5", body: "body notification 5", dayOfWeek: 1, hour: 22, minute: 29 },
  ]

const users = [ 
  {name: "Usuario 1", userToken:"ExponentPushToken[VP4zBCEcrzuOK6VFudF4qd]" },
  {name: "Usuario 2", userToken:"ExponentPushToken[VP4zBCEcrzuOK6VFudF4qd1]"} 
];

  sendPushNotification = async (notification, user) => {
    const message = {
      to: user.userToken,
      sound: 'default',
      title: `${user.name} venha conferir!`,
      body: notification.body,
      data: { data: "Conteudo" },
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

    if(response){
      console.log(`${notification.name} - token - ${user.userToken}`);
    }
    
  };


  
new CronJob('0 * * * * *', () => {
  
  const dateCurrent = Date.now();

  console.log("Log -> ", dateCurrent);

  notifications.map((notification) => {
    
    const scheduledDay = notification.dayOfWeek;
    const getDayCurrent  =  dateFns.getDay(dateCurrent);

      if(scheduledDay === getDayCurrent){
        
        const scheduledHour = notification.hour;
        const getHourCurrent = dateFns.getHours(dateCurrent);
      
        if( getHourCurrent === scheduledHour ){

          const scheduledMinute = notification.minute;
          const getMinuteCurrent = dateFns.getMinutes(dateCurrent);

          if( getMinuteCurrent === scheduledMinute){
            console.log("Dia da semana ok!")
            console.log("Hora ok!");
            console.log("Minuto ok!")

            users.map( async (user) => {
              sendPushNotification(notification, user);
             
            })
            console.log("------------------------")
          }
      }
    }
  });
}, null, true, "America/Sao_Paulo")





