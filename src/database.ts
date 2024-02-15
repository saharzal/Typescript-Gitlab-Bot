import { redisClient } from "./app";

export const getDataFromCache = async <T>(
  key: string
): Promise<T | undefined> => {
  try {
    const data = await redisClient.get(key);
    if (data) {
      return JSON.parse(data);
    }
    return undefined;
  } catch (error) {
    console.error("Get From DB Error: ", error);
    return undefined;
  }
};

export const setDataInCache = async (
  key: string,
  value: string
): Promise<void> => {
  try {
    await redisClient.set(key, value);
  } catch (error) {
    console.error("Get From DB Error: ", error);
  }
};
