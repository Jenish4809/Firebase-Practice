import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();
  const cartData = useSelector((state) => state.reducer);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.cartview}
        onPress={() => navigation.navigate("CartUi")}
      >
        <Text style={styles.text}>{cartData.length}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
    alignItems: "flex-end",
    padding: 10,
  },
  text: {
    marginHorizontal: 20,
    fontSize: 30,
  },
  cartview: {
    backgroundColor: "white",
    borderRadius: 50,
  },
});
