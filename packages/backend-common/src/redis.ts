import redis from "redis";


 const redisClient:redis.RedisClientType = redis.createClient({url:'redis://localhost:6379'});
redisClient.on("error",(error)=>{
   console.log(error,'this from redic cli', )
    redisClient.close()
   return;
});


(async()=>{
   if(!redisClient.isOpen){
    redisClient.connect();
   }
   else{
      return;
   }
})();

redisClient.on('connect',()=>console.log('Redis is connected'));


export default redisClient;