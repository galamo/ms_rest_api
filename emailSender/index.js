// Consumer
const amqp = require('amqplib/callback_api');
const queue = "vacationsNotifications";
let numberOfConnections = 0
function runningConsumer(){
amqp.connect('amqp://localhost', function(error0, connection) {
    numberOfConnections++;
  if (error0) {
    if(numberOfConnections >= 10) throw error0;
    console.log(error0)
    setTimeout(()=>{
        runningConsumer()
    },3000)
  }
  
  connection.createChannel(function(error1, channel) {
    if (error1) {
      
    }

    channel.assertQueue(queue, {
      durable: false
    });

    channel.consume(queue, function(message) {
        const messageObj = JSON.parse(message.content.toString());
        console.log(`Producer Recieved: ${JSON.stringify(messageObj)}`)
        sendEmail(messageObj)
    }, {
          noAck: true
    });

  });
});
}
runningConsumer()

function sendEmail(message){
    console.log("Email Sent", message)
}