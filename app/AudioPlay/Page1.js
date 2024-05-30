import "react-native-gesture-handler";
import { Alert, Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import CSafeAreaView from "../CSafeAreaView";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import * as Sharing from "expo-sharing";
import { colors } from "../Colors";
import { StorageValue } from "../ReduxApp/utils/asyncStorage";
import { changeThemeAction } from "../ReduxApp/redux/themeAction";

export default function Page1({ navigation }) {
  const [image, setImage] = React.useState([]);
  const [media, setMedia] = React.useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getTheme();
  }, []);

  const getTheme = async () => {
    try {
      let Data = await StorageValue();
      let themeColor = Data;
      if (!!Data) {
        if (themeColor === "light") {
          dispatch(changeThemeAction(colors.light));
        } else {
          dispatch(changeThemeAction(colors.dark));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const color = useSelector((state) => state.theme.theme);
  useEffect(() => {
    (async () => {
      const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

      if (mediaLibraryStatus.status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
      if (cameraStatus.status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    })();
  }, []);

  // Image Picker
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets.map((item) => item.uri));
      // setImage(result.assets[0].uri);
    }
  };

  // Render Multiple Images
  const renderMultiselectImage = ({ item }) => {
    return <Image source={{ uri: item }} style={styles.multiImage} />;
  };

  // Camera Open
  const onPressCameraOpen = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setMedia([...media, result.assets[0].uri]);
    }
  };

  // Render Video
  const renderVideo = ({ item }) => {
    return (
      <Video
        source={{ uri: item }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        useNativeControls
        isLooping
        style={styles.media}
      />
    );
  };

  // Next Button
  const onPressNext = () => {
    navigation.navigate("Page2", { image });
  };

  // Share Image
  // const shareImage = async () => {
  //   if (image === null) {
  //     Alert.alert("No image selected");
  //     return;
  //   }

  //   try {
  //     // Check if sharing is available
  //     const isSharingAvailable = await Sharing.isAvailableAsync();
  //     if (!isSharingAvailable) {
  //       Alert.alert("Sharing is not available on this device");
  //       return;
  //     }

  //     // Share the image
  //     await Sharing.shareAsync(image);
  //   } catch (error) {
  //     console.error("Error sharing the image:", error);
  //   }
  // };

  return (
    <CSafeAreaView extraStyle={{ backgroundColor: color.GrayScale }}>
      <View style={[styles.main, { backgroundColor: color.backgroundColor }]}>
        <Text style={[styles.title, { color: color.GrayScale }]}>Select Photos and Videos</Text>
        <View style={styles.innerview}>
          {!!image && (
            <FlatList
              data={image}
              renderItem={renderMultiselectImage}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            // <Image source={{ uri: image }} style={styles.multiImage} />
          )}
          <Button title="Select Photos" onPress={pickImage} />
          {image && <Button title="Share Image" />}
          {!!media && (
            <FlatList data={media} renderItem={renderVideo} horizontal showsHorizontalScrollIndicator={false} />
          )}
          <Button title="Open Camera" onPress={onPressCameraOpen} />
          <TouchableOpacity style={[styles.btn, { backgroundColor: color.primary }]} onPress={onPressNext}>
            <Text style={{ color: color.GrayScale }}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CSafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerview: {
    flex: 1,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  multiImage: {
    width: 200,
    height: 200,
    margin: 5,
    resizeMode: "contain",
  },
  media: {
    width: 200,
    height: 300,
    margin: 5,
    resizeMode: "contain",
    alignSelf: "center",
  },
  btn: {
    padding: 10,
    borderRadius: 10,
    margin: 10,
    width: 100,
    alignItems: "center",
  },
});
