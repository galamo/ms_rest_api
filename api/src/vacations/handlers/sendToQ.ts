var amqp = require("amqplib/callback_api");

function sendToQ(data) {
  amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = "emailSender";
      var msg = "data";

      channel.assertQueue(queue, {
        durable: false,
      });

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
      console.log(" [x] Sent %s", msg);
    });
  });
}

export { sendToQ };
