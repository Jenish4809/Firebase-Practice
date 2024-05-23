import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Video } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

export default function Video1() {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [isMuted, setIsMuted] = useState(false);

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
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMuteUnmute} style={styles.mute}>
        <MaterialIcons
          name={isMuted ? "volume-off" : "volume-up"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
      <Video
        ref={videoRef}
        source={{
          uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        }}
        style={styles.backgroundVideo}
        resizeMode="contain"
        isLooping
        shouldPlay
        isMuted={isMuted}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.content}>
        <View style={styles.controls}>
          <TouchableOpacity onPress={handleBackward}>
            <MaterialIcons name="replay-10" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePlayPause}
            style={styles.playPauseButton}
          >
            <MaterialIcons
              name={status.isPlaying ? "pause" : "play-arrow"}
              size={50}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForward}>
            <MaterialIcons name="forward-10" size={40} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.timer}>
          <Text style={styles.timerText}>
            {formatTime(status.positionMillis)}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={status.durationMillis || 0}
            value={status.positionMillis}
            onValueChange={handleSliderValueChange}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#d6c5c5"
            thumbTintColor="#FFFFFF"
          />
          <Text style={styles.timerText}>
            {formatTime(status.durationMillis)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  backgroundVideo: {
    height: 300,
    width: "100%",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
  },
  slider: {
    width: "70%",
  },
  timer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 10,
  },
  timerText: {
    color: "white",
  },
  mute: {
    marginHorizontal: 20,
    marginTop: 20,
  },
});
