import { createClient } from 'redis';

const redisClient = createClient({
    url: 'redis://redis:6379', // redis://{nom-du-container-redis}:{port-redis}
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

redisClient.connect()
    .then(()=> console.log('Connected to Redis'));

export default redisClient;