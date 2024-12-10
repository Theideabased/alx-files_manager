import redis from 'redis'


class RedisClient { 
    constructor() {
        this.client = redis.createClient();
        this.connected = false;

        this.client.connect()
        .then(() => {
            console.log('Redis client connected');
            this.connected = true;
        })
        .catch((err) => {
            console.error("Redis connection failed", err)
        });
        this.client.on('error', (err) =>{
            this.connected = false;
            console.error('Redis Client Error: ', err);
        });
    }

    isAlive(){
        return this.connected;
    };

    async get(value){
        this.client.get(value); 
    }
    async set(name, value, duration){
        this.client.set(name, value, 'EX', duration);
    }
    async del(key){
        this.client.del(key)
    }
}
const redisClient = new RedisClient();
export default redisClient;