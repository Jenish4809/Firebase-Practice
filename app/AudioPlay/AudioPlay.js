import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";

export default function AudioPlay() {
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

  return (
    <View style={[styles.main, { backgroundColor: color.backgroundColor }]}>
      <Text style={styles.title}>AudioPlay</Text>
      <View style={styles.innerview}>
        <View style={styles.durationContainer}>
          <Text style={styles.durationText}>{formatTime(position)} / </Text>
          <Text style={styles.durationText}>{formatTime(duration)}</Text>
        </View>
        <Slider
          style={{ width: "80%" }}
          value={position}
          maximumValue={duration}
          minimumTrackTintColor={color.GrayScale}
          maximumTrackTintColor="#d6c5c5"
          thumbTintColor={color.GrayScale}
          onSlidingComplete={onSeek}
          disabled={!sound}
        />
        <TouchableOpacity style={styles.button} onPress={playSound}>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>{isPlaying ? "Pause Sound" : "Play Sound"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  innerview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "skyblue",
    padding: 20,
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
    width: 200,
    alignSelf: "center",
  },
  durationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  durationText: {
    fontSize: 16,
  },
});
