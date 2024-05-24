import { FlatList, Image, StyleSheet, Switch, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../Colors";
import { THEME } from "./utils/keys";
import { setAsyncStorageData } from "./utils/helper";
import { changeThemeAction } from "./redux/themeAction";

export default function CartUi() {
  const cartItems = useSelector((state) => state.reducer);
  const color = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const [isEnable, setIsEnable] = useState(!!color.dark);

  const onPressLightTheme = async () => {
    await setAsyncStorageData(THEME, "light");
    dispatch(changeThemeAction(colors.light));
  };
  const onPressDarkTheme = async () => {
    await setAsyncStorageData(THEME, "dark");
    dispatch(changeThemeAction(colors.dark));
  };

  const toggleSwitch = (val) => {
    if (val) {
      onPressDarkTheme();
    } else {
      onPressLightTheme();
    }
    setIsEnable((previousState) => !previousState);
  };
  const renderData = ({ item }) => {
    return (
      <View style={[styles.main1, { backgroundColor: color.darkgray }]}>
        <Text style={[styles.text, { color: color.backgroundColor }]}>{item.name}</Text>
        <Text style={[styles.text, { color: color.backgroundColor }]}>{item.color}</Text>
        <Text style={[styles.text, { color: color.backgroundColor }]}>{item.price}</Text>
        <Image source={color.light ? item.darkimage : { uri: item.lightimage }} style={styles.imagesty} />
      </View>
    );
  };

  const listEmpty = () => {
    return (
      <View style={[styles.main1, { backgroundColor: color.darkgray }]}>
        <Text style={[styles.text, { color: color.backgroundColor }]}>No Data Found</Text>
      </View>
    );
  };
  return (
    <View style={[styles.main, { backgroundColor: color.backgroundColor }]}>
      <View style={styles.innerview}>
        <Switch
          trackColor={{ false: color.darkgray, true: color.input }}
          thumbColor={color.purple}
          onValueChange={toggleSwitch}
          value={isEnable}
          style={styles.switch}
        />
        <Text style={styles.title}>Cart</Text>
      </View>
      <FlatList data={cartItems} renderItem={renderData} ListEmptyComponent={listEmpty} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    marginLeft: 110,
    fontWeight: "500",
    color: "white",
  },
  innerview: {
    backgroundColor: "salmon",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
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
  switch: {
    marginLeft: 15,
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
  },
});
