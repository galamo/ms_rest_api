const amqp = require("amqplib/callback_api");

function sendToQueue(queueName: string, message: any) {
  console.log(message, "****************", "to queue", queueName);
  amqp.connect(process.env.RMQ_HOST, function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      channel.assertQueue(queueName, {
        durable: false,
      });
      const objMessageWrapper = { message };
      channel.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(objMessageWrapper))
      );
    });
  });
}
export { sendToQueue };
