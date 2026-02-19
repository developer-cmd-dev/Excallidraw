import redis from "redis";


 const redisClient:redis.RedisClientType = redis.createClient({url:'redis://localhost:6379'});

redisClient.on("error",(error)=>console.log(error,'this from redic cli'));


(async()=>{
   if(!redisClient.isOpen){
    redisClient.connect();
   }
})();

redisClient.on('connect',()=>console.log('Redis is connected'));


export default redisClient;