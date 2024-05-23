import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();
  const cartData = useSelector((state) => state.reducer);
  const color = useSelector((state) => state.theme.theme);

  return (
    <View style={[styles.container, { backgroundColor: color.GrayScale }]}>
      <TouchableOpacity
        style={[styles.cartview, { backgroundColor: color.purple }]}
        onPress={() => navigation.navigate("CartUi")}
      >
        <Text style={[styles.text, { color: color.GrayScale }]}>
          {cartData.length}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    padding: 10,
  },
  text: {
    marginHorizontal: 20,
    fontSize: 30,
  },
  cartview: {
    borderRadius: 50,
  },
});
