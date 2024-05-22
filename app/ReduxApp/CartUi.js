import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

export default function CartUi() {
  const cartItems = useSelector((state) => state.reducer);
  const renderData = ({ item }) => {
    return (
      <View style={styles.main1}>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>{item.color}</Text>
        <Text style={styles.text}>{item.price}</Text>
        <Image source={{ uri: item.image }} style={styles.imagesty} />
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <View style={styles.innerview}>
        <Text style={styles.title}>Cart</Text>
      </View>
      <FlatList data={cartItems} renderItem={renderData} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
    fontWeight: "500",
    color: "white",
  },
  innerview: {
    backgroundColor: "salmon",
  },
  main1: {
    alignItems: "center",
    margin: 20,
    borderWidth: 3,
    padding: 10,
    borderColor: "salmon",
    borderRadius: 20,
    width: 250,
    alignSelf: "center",
  },
  imagesty: {
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 25,
  },
});
