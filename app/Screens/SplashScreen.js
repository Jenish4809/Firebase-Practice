import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { StackActions } from "@react-navigation/native";

const SplashScreen = ({ navigation }) => {
  const auth = getAuth();
  useEffect(() => {
    setTimeout(() => {
      onAuthStateChanged(auth, (user) => {
        const routeName = user !== null ? "Details" : "Login";
        navigation.dispatch(StackActions.replace(routeName));
      });
    }, 3000);
    return () => {};
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
