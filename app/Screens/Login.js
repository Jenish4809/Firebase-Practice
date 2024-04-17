import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState } from "react";
import {
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { StackActions } from "@react-navigation/native";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const signIn = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        const user = await signInWithEmailAndPassword(auth, email, password);
        if (user.user.emailVerified) {
          navigation.dispatch(StackActions.replace("Details"));
        } else {
          alert("Please verify Your Email checkout Inbox");
        }
      } else {
        Alert.alert("Please enter all the data");
        await sendEmailVerification(auth.currentUser);
        await signOut(auth);
      }
    } catch (err) {
      Alert.alert(err);
    }
  };

  const onPresssignUp = () => {
    navigation.navigate("SignUp");
  };
  return (
    <View style={styles.main}>
      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        placeholderTextColor={"black"}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Enter Password"
        style={styles.input}
        placeholderTextColor={"black"}
        value={password}
        onChangeText={(text) => setPassword(text)}
        textContentType="password"
        secureTextEntry
      />
      <View style={styles.innerview}>
        <Button title="Login" onPress={signIn} />
        <TouchableOpacity onPress={onPresssignUp}>
          <Text style={{ fontSize: 15 }}>Don't have an Account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    height: 60,
    margin: 12,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 10,
    fontSize: 20,

    alignItems: "center",
    alignSelf: "center",
  },
  innerview: {
    gap: 20,
  },
});
