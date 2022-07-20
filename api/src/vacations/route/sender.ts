const amqp = require("amqplib/callback_api");

const queue: string = "vacationsNotifications";

function sendToQueue(message) {
  console.log(message, "****************");
  amqp.connect(process.env.RMQ_HOST, function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      channel.assertQueue(queue, {
        durable: false,
      });
      const objMessageWrapper = { message };
      channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(objMessageWrapper))
      );
    });
  });
}

module.exports = { sendToQueue };
