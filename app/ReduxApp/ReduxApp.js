import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import Header from "./Header";
import Product from "./Product";
import { product } from "./Constant";

export default function ReduxApp() {
  return (
    <View style={styles.main}>
      <Header />
      <ScrollView bounces={false}>
        {product.map((item) => (
          <View key={item.id}>
            <Product item={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
  },
});
