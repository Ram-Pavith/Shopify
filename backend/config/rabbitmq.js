import amqp from "amqplib"

// const QUEUE_NAME = 'square';
// const EXCHANGE_TYPE = 'direct';
// const EXCHANGE_NAME = 'main';
// const KEY = 'myKey';
// const number = '5'
// connection = amqp.connect('amqp://localhost:5672');
// connection.then(async (conn)=>{
//    const channel = await conn.createChannel();
//    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
//    await channel.assertQueue(QUEUE_NAME);
//    channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, KEY);
// })
var channel, connection;  //global variables
async function connectQueue() {   
    try {        
        connection = await amqp.connect("amqp://localhost:5672");
        channel    = await connection.createChannel()
        
        await channel.assertQueue("test-queue")
        
    } catch (error) {
        console.log(error)
    }
}

async function sendData (data) {    // send data to queue
    await channel.sendToQueue("test-queue", Buffer.from(JSON.stringify(data)));
    // close the channel and connection
    // channel.close()
    // connection.close()
}
connectQueue()
export default sendData