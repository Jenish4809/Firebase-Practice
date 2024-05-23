import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import Header from "./Header";
import Product from "./Product";
import { product } from "./Constant";
import { useDispatch, useSelector } from "react-redux";
import { StorageValue } from "./utils/asyncStorage";
import { changeThemeAction } from "./redux/themeAction";
import { colors } from "../Colors";

export default function ReduxApp() {
  const color = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    getTheme();
  }, []);

  const getTheme = async () => {
    try {
      let Data = await StorageValue();
      let themeColor = Data;
      if (!!Data) {
        if (themeColor === "light") {
          dispatch(changeThemeAction(colors.light));
        } else {
          dispatch(changeThemeAction(colors.dark));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
  },
});
