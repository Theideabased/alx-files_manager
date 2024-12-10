// utils/redis.js

import redis from 'redis';

class RedisClient {
    constructor() {
        // Create a new Redis client
        this.client = redis.createClient();

        // Flag to track if the Redis connection is successful
        this.connected = true;

        // When the client is ready, update the connected status
        this.client.on('ready', () => {
            this.connected = true;
        });
        this.client.on('error', (err) => {
            this.connected = false;
            console.error('Redis Client Error:', err);
        });
    }

    isAlive() {
        return this.connected;
    }
    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, reply) => {
                if (err) {
                    reject(`Error getting key "${key}": ${err}`);
                }
                resolve(reply); // Return the value stored for the given key
            });
        });
    }

    // Asynchronous method to set a value with expiration
    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, duration, value, (err, reply) => {
                if (err) {
                    reject(`Error setting key "${key}": ${err}`);
                }
                resolve(reply); // Reply should indicate if the set operation was successful
            });
        });
    }

    
    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, reply) => {
                if (err) {
                    reject(`Error deleting key "${key}": ${err}`);
                }
                resolve(reply); // Reply will be the number of keys deleted
            });
        });
    }
}

// Create and export a single instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
