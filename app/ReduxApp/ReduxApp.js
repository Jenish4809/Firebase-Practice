import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import Header from "./Header";
import Product from "./Product";
import { product } from "./Constant";
import { useSelector } from "react-redux";
import CSafeAreaView from "../CSafeAreaView";

export default function ReduxApp() {
  const color = useSelector((state) => state.theme.theme);

  return (
    <CSafeAreaView contentContainerStyle={styles.container}>
      <View style={[styles.main, { backgroundColor: color.backgroundColor }]}>
        <Header />
        <ScrollView bounces={false}>
          {product.map((item) => (
            <View key={item.id}>
              <Product item={item} />
            </View>
          ))}
        </ScrollView>
      </View>
    </CSafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
