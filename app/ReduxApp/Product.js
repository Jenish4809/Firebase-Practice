import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "./redux/action";

export default function Product(props) {
  const item = props.item;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.reducer);
  const color = useSelector((state) => state.theme.theme);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddItem = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item.id));
  };

  useEffect(() => {
    let result = cartItems.filter((element) => {
      return element.id === item.id;
    });
    if (result.length) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [cartItems]);

  return (
    <View style={[styles.main, { backgroundColor: color.darkgray }]}>
      <Text style={[styles.text, { color: color.backgroundColor }]}>
        {item.name}
      </Text>
      <Text style={[styles.text, { color: color.backgroundColor }]}>
        {item.color}
      </Text>
      <Text style={[styles.text, { color: color.backgroundColor }]}>
        {item.price}
      </Text>
      <Image
        source={color.light ? item.darkimage : { uri: item.lightimage }}
        style={styles.imagesty}
      />

      <Button
        title={isAdded ? "Remove from Cart" : "Add to Cart"}
        onPress={() => (isAdded ? handleRemoveItem(item) : handleAddItem(item))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
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
