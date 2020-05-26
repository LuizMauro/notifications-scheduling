const CronJob = require("cron").CronJob
const dateFns = require("date-fns");
const fetch   = require('node-fetch');
const gcm     = require('node-gcm'); 


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


  sendPusNotification = async (notification, user) =>{
   
  const sender = new gcm.Sender("AAAAKrbWcOk:APA91bGRAl5-6H5lMZ3XYsS2CE9PSwmvdJ03YEa0ffSg3_WooeiC6j--YJgKDx2k8n5xgHZ1EY9izUWrMJALzF5jCJZhgEuiN_XkJ5xXrJGHKPBWxeGnmpxkn7KIh7JhoHtoFEH9KbcQ");


    const message = new gcm.Message ({
      data:{
        title: 'titulo3',
        body: 'body3',
        sound: 'default',
        bagde: '1',
        color: '#E5A95D',
        image: "https://santuariosenhordobonfim.com/images/notificacao/icone-notificacao.png",
      }
    });

    const regTokens = ['dxCH4Vmdb0I:APA91bFW2qX4aLCOtI4a6Y4JFjseqoPaKlOPy2kL7wSSKzNG-e47oUre6TLZq6yw8H3Szq9W807ozSKkI1BLCzHb-m-UyPRhebgW5MUj_fhHO87vwrOsW-3g7yn3wLEJLnjNHiUMeLaO'];

    sender.send(message, { registrationTokens: regTokens}, (err, response) => {
      if(err){
        console.log(err);
      }else{
        console.log(response);
      }
    })

  } 


  
new CronJob('0 */30 * * * *', () => {
  
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
              if(user.userToken){
                sendPushNotification(notification, user);
              }
            })
            console.log("------------------------")
          }
      }
    }
  });
}, null, true, "America/Sao_Paulo")

