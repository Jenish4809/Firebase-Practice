import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useSelector } from "react-redux";

export default function Video1({ navigation }) {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [isMuted, setIsMuted] = useState(false);
  const color = useSelector((state) => state.theme.theme);

  const onPressNext = () => {
    navigation.navigate("ReduxApp");
  };
  const formatTime = (millis) => {
    if (!millis) return "00:00:00";
    const date = new Date(millis);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handlePlayPause = () => {
    if (status.isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
  };

  const handleForward = () => {
    videoRef.current.setPositionAsync(status.positionMillis + 10000); // Forward 10 seconds
  };

  const handleBackward = () => {
    videoRef.current.setPositionAsync(status.positionMillis - 10000); // Backward 10 seconds
  };

  const handleMuteUnmute = () => {
    videoRef.current.setIsMutedAsync(!isMuted);
    setIsMuted(!isMuted);
  };
  const handleSliderValueChange = (value) => {
    videoRef.current.setPositionAsync(value);
  };

  return (
    <View style={[styles.container, { backgroundColor: color.backgroundColor }]}>
      <TouchableOpacity onPress={handleMuteUnmute} style={styles.mute}>
        <MaterialIcons name={isMuted ? "volume-off" : "volume-up"} size={24} color={color.GrayScale} />
      </TouchableOpacity>
      <View>
        <Video
          ref={videoRef}
          source={{
            uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          }}
          style={styles.backgroundVideo}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          shouldPlay
          isMuted={isMuted}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <View style={styles.content}>
          <View style={styles.controls}>
            <TouchableOpacity onPress={handleBackward}>
              <MaterialIcons name="replay-10" size={30} color={color.GrayScale} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePlayPause}>
              <MaterialIcons name={status.isPlaying ? "pause" : "play-arrow"} size={50} color={color.GrayScale} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForward}>
              <MaterialIcons name="forward-10" size={30} color={color.GrayScale} />
            </TouchableOpacity>
          </View>
          <View style={styles.timer}>
            <Text color={color.GrayScale}>{formatTime(status.positionMillis)} / </Text>
            <Text color={color.GrayScale}>{formatTime(status.durationMillis)}</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={status.durationMillis || 0}
            value={status.positionMillis}
            onValueChange={handleSliderValueChange}
            minimumTrackTintColor={color.GrayScale}
            maximumTrackTintColor="#d6c5c5"
            thumbTintColor={color.GrayScale}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPressNext}>
        <Text>Next Shopping Page</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundVideo: {
    height: 250,
    width: "100%",
  },
  content: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
  },
  slider: {
    width: "100%",
  },
  timer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
    marginLeft: 20,
  },

  mute: {
    marginHorizontal: 20,
    marginTop: 20,
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
});
