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
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const signUp = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(auth.currentUser);
        await signOut(auth);
        Alert.alert("Please verify your Email Check out Link In Your Inbox");
        navigation.navigate("Login");
        setEmail(""), setPassword("");
      } else {
        Alert.alert("Please enter all data");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("User already Eaxist");
    }
  };

  const loginNav = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.main}>
      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        placeholderTextColor={"white"}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Enter Password"
        style={styles.input}
        placeholderTextColor={"white"}
        value={password}
        onChangeText={(text) => setPassword(text)}
        textContentType="password"
      />
      <View style={styles.innerview}>
        <Button title="Create Account" onPress={signUp} />
        <TouchableOpacity onPress={loginNav}>
          <Text style={{ color: "white", fontSize: 15 }}>
            Already have an Account? Log In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "salmon",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    height: 60,
    margin: 12,
    borderWidth: 1,
    borderColor: "white",
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
