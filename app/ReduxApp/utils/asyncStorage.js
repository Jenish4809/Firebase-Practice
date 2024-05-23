import AsyncStorage from "@react-native-async-storage/async-storage";
import { THEME } from "./keys";

export const StorageValue = async () => {
  let asyncData = await AsyncStorage.getItem(THEME);
  const themeColor = JSON.parse(asyncData);
  return themeColor;
};
