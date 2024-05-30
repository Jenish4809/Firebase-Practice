import React from "react";
import { View, Text, Dimensions, StyleSheet, Image, Button } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Animated, { useAnimatedStyle, interpolate } from "react-native-reanimated";
import CSafeAreaView from "../CSafeAreaView";
import { useSelector } from "react-redux";

const Page2 = ({ route, navigation }) => {
  const { image } = route.params;
  const { width: screenWidth } = Dimensions.get("window");
  const { height: screenHeight } = Dimensions.get("window");
  const color = useSelector((state) => state.theme.theme);

  const onPressNext = () => {
    navigation.navigate("Page3");
  };

  const renderItem = ({ item, index, animationValue }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(animationValue.value, [-1, 0, 1], [0.85, 1, 0.85]);
      return {
        transform: [{ scale }],
      };
    });

    return (
      <Animated.View style={[styles.itemContainer, animatedStyle, { backgroundColor: color.GrayScale }]}>
        <Image source={{ uri: item }} style={styles.imagesty} />
      </Animated.View>
    );
  };

  return (
    <CSafeAreaView extraStyle={{ backgroundColor: "black" }}>
      <View style={[styles.container, { backgroundColor: color.backgroundColor }]}>
        <View style={styles.innerview}>
          <Text style={styles.title}>Carousel</Text>
          {!!image && (
            <Carousel
              // autoPlay
              width={screenWidth / 1.2}
              height={screenHeight / 2}
              data={image}
              renderItem={({ item, index, animationValue }) => renderItem({ item, animationValue })}
              mode="horizontal-stack"
              modeConfig={{
                snapDirection: "left",
                stackInterval: 18,
              }}
            />
          )}
          <Button title="Next" onPress={onPressNext} />
        </View>
      </View>
    </CSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    padding: 10,
    borderRadius: 8,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imagesty: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    alignSelf: "center",
  },
  innerview: {
    flex: 1,
    marginBottom: 20,
  },
});

export default Page2;
