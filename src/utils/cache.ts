import redisClient from './redisClient';

export const setCache = async (key: string, value: any, ttl: number = 3600) => {
    await redisClient.set(key, JSON.stringify(value), {
        EX: ttl,
    });
};

export const getCache = async (key: string) => {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
};

export const delCache = async (key: string) => {
    await redisClient.del(key);
};