import { createClient, RedisClientType } from "redis";


 const redisClient:RedisClientType = createClient({url:'redis://localhost:6379'});

redisClient.on("error",(error)=>console.log(error));


(async()=>{
   if(!redisClient.isOpen){
    redisClient.connect();
   }
})();

redisClient.on('connect',()=>console.log('Redis is connected'));


export default redisClient;