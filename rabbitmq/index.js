'use strict';

var amqp = require('amqplib/callback_api');
var eventeDic = require('../eventsDic.json');
var dbAdapter = require('./saveEventsData');

module.exports = function(db) {
  console.log("Dic", eventeDic)

  function parserEvent(event) {
    var eventObj = JSON.parse(event);
    var dbName = '';

    for (let key in eventeDic) {
      // event type has to be key eventType
      if (eventeDic[key].indexOf(eventObj['eventType']) !== -1) {
        dbName = key;
        break;
      }
    }

    if (dbName = '') {
      console.error('Undefinated event type');
    } else {
      // save data to db
      dbAdapter['dbName'](db[dbName], eventObj);
    }
  }

  amqp.connect(`amqp://${process.env.RABBIT_MQ_HOST}:${process.env.RABBIT_MQ_PORT}`, function(error0, connection) {
    if (error0) throw error0;
    

    connection.createChannel(function(error1, channel) {
      if (error1) throw error1;
      
      var exchange = process.env.RABBIT_MQ_EXCHANGE;
      console.log("Rabbitmq exchange: ", exchange);

      channel.assertExchange(exchange, 'fanout', { durable: false });

      channel.assertQueue(process.env.RABBIT_MQ_QUEUE, { exclusive: true, durable: true }, function(error2, q) {
          if (error2) throw error2;
          
          console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
          channel.bindQueue(q.queue, exchange, '');

          channel.consume(q.queue, function(msg) {
            if(msg.content) {
                console.log(" [x] %s", msg.content.toString());
                // parse message
                parserEvent(msg.content);
              }
          }, 
          { noAck: true }
        );
      });
    });
  });
}