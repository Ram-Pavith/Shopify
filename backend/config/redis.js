import redis from 'redis'

const REDIS_PORT = process.env.REDIS_PORT || 6380;

const client = redis.createClient(REDIS_PORT);

// Cache middleware
function cache(req, res, key, next) {
client.get(key, (err, data) => {
    if (err) throw err;

    if (data !== null) {
    return data
    } else {
    throw new Error('No Cached item with the key')
    }
});
}

export {client,cache}