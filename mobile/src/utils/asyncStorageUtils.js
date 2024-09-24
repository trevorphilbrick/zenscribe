// crreate utils for saving and getting data from async storage

import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    const parsed = await JSON.parse(value);
    return parsed;
  } catch (error) {
    console.log(error);
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export const clearData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

export const getAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.log(error);
  }
};

export const multiGet = async (keys) => {
  try {
    return await AsyncStorage.multiGet(keys);
  } catch (error) {
    console.log(error);
  }
};

export const multiSet = async (keyValuePairs) => {
  try {
    return await AsyncStorage.multiSet(keyValuePairs);
  } catch (error) {
    console.log(error);
  }
};

export const updateData = async (key, value) => {
  try {
    const existingValue = await getData(key);
    if (existingValue) {
      await saveData(key, { ...existingValue, ...value });
    } else {
      await saveData(key, value);
    }
  } catch (error) {
    console.log(error);
  }
};
