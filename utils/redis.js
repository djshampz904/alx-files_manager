const {createClient} = require('redis');
const {promisify} = require('util');

const client = createClient()

class RedisClient {
    constructor() {
        client.on('error', (err) => {
            console.log("Redis client error", err.toString())
        });
    }

    isAlive() {
        // if client is connected return true else return false
        return client.connected;
    }

    // async get function takes string key as argument and return redis value stored for the key
    async get(key) {
        return await promisify(client.get).bind(client)(key)
    }

    async set(key, value, duration) {
        await promisify(client.set).bind(client)(key, value, 'EX', duration)
    }

    // remove value from key
    async delete(key) {
        await promisify(client.del).bind(client)(key)
    }
}

// export instance
const redisClient = new RedisClient();
module.exports = redisClient;