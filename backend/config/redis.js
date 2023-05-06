import redis from 'redis'

const REDIS_PORT = process.env.REDIS_PORT || 6380;

const client = redis.createClient(REDIS_PORT);

// Cache middleware
function cache(req, res, key, next) {
    console.log("hello")
    try{
        console.log("in try get")
        client.get(key, function(err,result){
            if (err) {
              throw err
            }
            return result
          });
    }catch(ex){
        console.log(ex)
        console.log("redis in catch get")
        redis.status(400).json("from redis cache catch")
    }
}

export {client,cache}