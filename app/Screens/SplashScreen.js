import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  const getUser = async () => {
    const userData = await AsyncStorage.getItem("userstore");
    const newData = userData;
    navigation.navigate(newData ? "Details" : "Login");
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <View style={styles.main}>
      <Text style={{ fontSize: 20 }}>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#90ee90",
    alignItems: "center",
    justifyContent: "center",
  },
});
