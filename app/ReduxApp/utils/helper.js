import AsyncStorage from "@react-native-async-storage/async-storage";

const setAsyncStorageData = async (key, value) => {
  const data = JSON.stringify(value);
  await AsyncStorage.setItem(key, data);
};

const getAsyncStorageData = async (key) => {
  const data = await AsyncStorage.getItem(key);
  return JSON.parse(data);
};

export { setAsyncStorageData, getAsyncStorageData };
