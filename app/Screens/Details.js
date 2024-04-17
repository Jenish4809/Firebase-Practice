import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Details = ({ navigation }) => {
  const [data, setData] = useState("");
  const auth = getAuth();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const userData = await AsyncStorage.getItem("userstore");
    const newData = JSON.parse(userData);
    setData(newData);
  };
  const logOutUser = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userstore");
      navigation.dispatch(StackActions.replace("Login"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Email : {data}</Text>
      <Text>UID : {auth.currentUser?.uid}</Text>
      <Button title="Log Out" onPress={logOutUser} />
    </View>
  );
};

export default Details;
