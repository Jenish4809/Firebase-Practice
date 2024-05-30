import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { MaterialIcons } from "@expo/vector-icons";
import CSafeAreaView from "../CSafeAreaView";

export default function AudioPlay({ navigation }) {
  const color = useSelector((state) => state.theme.theme);
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  // useEffect for unloading the sound
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // function for play sound
  async function playSound() {
    if (sound) {
      if (isPlaying) {
        console.log("Pausing Sound");
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        console.log("Resuming Sound");
        await sound.playAsync();
        setIsPlaying(true);
      }
    } else {
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync({
        uri: "https://firebasestorage.googleapis.com/v0/b/exponutrition-b4e67.appspot.com/o/Dekhha%20Tenu%20_%20Mr.%20%26%20Mrs.%20Mahi%20_%20Rajkummar%20Rao%2C%20Janhvi%20Kapoor%20_%20Mohd.%20Faiz%20_%20Jaani%20_%20Aadesh%20S_%20Sameer%20-%20Sony%20Music%20India.mp3?alt=media&token=7abbdbf2-d82e-42ae-a454-e7770fb47b2d",
      });
      setSound(sound);
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isPlaying !== isPlaying) {
          setIsPlaying(status.isPlaying);
        }
        setPosition(status.positionMillis);
        setDuration(status.durationMillis);
      });

      console.log("Playing Sound");
      await sound.playAsync();
      setIsPlaying(true);
    }
  }
  // onSeek function for seek the audio
  async function onSeek(value) {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  }

  // function for format the time
  function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  // function for navigate to the video
  const onPressNavigate = () => {
    navigation.navigate("Video1");
  };

  return (
    <CSafeAreaView extraStyle={{ backgroundColor: "#000" }}>
      <View style={[styles.main, { backgroundColor: color.backgroundColor }]}>
        <ImageBackground source={require("../assets/guitar.jpeg")} style={styles.backgroundImage}>
          <View style={styles.innerview}>
            <TouchableOpacity onPress={playSound}>
              <MaterialIcons name={isPlaying ? "pause" : "play-arrow"} size={50} color={"#000"} />
            </TouchableOpacity>
            <View style={styles.durationContainer}>
              <Text style={styles.durationText}>{formatTime(position)} / </Text>
              <Text style={styles.durationText}>{formatTime(duration)}</Text>
            </View>

            <Slider
              style={{ width: "80%" }}
              value={position}
              maximumValue={duration}
              minimumTrackTintColor="#fff"
              maximumTrackTintColor="#000000"
              thumbTintColor="#000000"
              onSlidingComplete={onSeek}
              disabled={!sound}
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={onPressNavigate}>
            <Text style={styles.nextbtn}>Go to The Video</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </CSafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  innerview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  durationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  durationText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  btn: {
    marginBottom: 20,
    marginHorizontal: 50,
  },
  nextbtn: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#000",
    padding: 10,
    textAlign: "center",
  },
});
