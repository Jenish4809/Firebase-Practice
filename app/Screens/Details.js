import { View, Text, Button } from "react-native";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { StackActions } from "@react-navigation/native";

const Details = ({ navigation }) => {
  const auth = getAuth();

  const logOutUser = async () => {
    try {
      await signOut(auth);
      navigation.dispatch(StackActions.replace("Login"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Email : {auth.currentUser?.email}</Text>
      <Text>UID : {auth.currentUser?.uid}</Text>
      <Button title="Log Out" onPress={logOutUser} />
    </View>
  );
};

export default Details;
