import { StyleSheet, Text, View, TextInput, Button, Platform } from "react-native";
import React from "react";
import CSafeAreaView from "../CSafeAreaView";
import KeyBoardAvoidWrapper from "./Common/KeyBoardAvoidWrapper";
import * as Print from "expo-print";
import { useSelector } from "react-redux";
import * as Sharing from "expo-sharing";
import * as ImagePicker from "expo-image-picker";

export default function Page3({ navigation }) {
  const color = useSelector((state) => state.theme.theme);
  const [name, setName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [imageUri, setImageUri] = React.useState(null);

  const onChangeName = (text) => {
    setName(text);
  };

  const onChangeMobile = (text) => {
    setMobile(text);
  };

  const onChangeGender = (text) => {
    setGender(text);
  };
  const onChangeAddress = (text) => {
    setAddress(text);
  };

  const onPressNext = () => {
    navigation.navigate("AudioPlay");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const generatePDF = async () => {
    const htmlContent = `
          <html>
          <head>
          <style>
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 90%;
          }
           .image-container {
            display: flex;
            justify-content: center;
            margin: 20px 0;
          }
          td, th {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
              }
          tr:nth-child(even) {
              background-color: #dddddd;
          }
          </style>
          </head>
          <body>
          <h2>PDF Generate Form</h2>
          <div class="image-container">
            <img src="${imageUri}" alt="Image" width="150" height="150"/>
          </div>
          <table>
          <tr>
              <th>Name</th>
              <td>${name}</td>
          </tr>
          <tr>
              <th>Mobile</th>
              <td>${mobile}</td>
          </tr>
          <tr>
               <th>Email Address</th>
              <td>${address}</td>
          </tr>
          <tr>
               <th>Gender</th>
              <td>${gender}</td>
          </tr>
          </table>
          </body>
          </html>
      `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      if (Platform.OS === "ios") {
        await Sharing.shareAsync(uri);
      } else {
        await Sharing.shareAsync(uri, { dialogTitle: "My Pdf", mimeType: "application/pdf", UTI: "com.adobe.pdf" });
      }
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  return (
    <CSafeAreaView extraStyle={{ backgroundColor: "black" }}>
      <KeyBoardAvoidWrapper contentContainerStyle={[styles.main, { backgroundColor: color.backgroundColor }]}>
        <Text style={[styles.title, { color: color.GrayScale }]}>PDF Generate Form</Text>
        <View style={styles.innerview}>
          <TextInput
            placeholder="Enter Name"
            style={[styles.inputsty, { color: color.GrayScale, borderColor: color.GrayScale }]}
            value={name}
            onChangeText={onChangeName}
            placeholderTextColor={color.GrayScale}
          />
          <TextInput
            placeholder="Enter Mobile No"
            style={[styles.inputsty, { color: color.GrayScale, borderColor: color.GrayScale }]}
            value={mobile}
            onChangeText={onChangeMobile}
            placeholderTextColor={color.GrayScale}
          />
          <TextInput
            placeholder="Enter Gender"
            style={[styles.inputsty, { color: color.GrayScale, borderColor: color.GrayScale }]}
            value={gender}
            onChangeText={onChangeGender}
            placeholderTextColor={color.GrayScale}
          />
          <TextInput
            placeholder="Enter Email Address"
            style={[styles.inputsty, { color: color.GrayScale, borderColor: color.GrayScale }]}
            value={address}
            onChangeText={onChangeAddress}
            placeholderTextColor={color.GrayScale}
          />
          <Button title="Pick Image" onPress={pickImage} />
          <Button title="Generate PDF" onPress={generatePDF} />
        </View>
        <Button title="Next" onPress={onPressNext} />
      </KeyBoardAvoidWrapper>
    </CSafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
  },
  innerview: {
    flex: 1,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  inputsty: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
  },
});
