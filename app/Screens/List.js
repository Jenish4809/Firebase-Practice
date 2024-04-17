import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";

const List = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const todoRef = collection(FIREBASE_DB, "todos");

    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        const todos = [];
        snapshot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setTodos(todos);
      },
    });
    return () => subscriber();
  }, []);

  const addTodo = async () => {
    const doc = await addDoc(collection(FIREBASE_DB, "todos"), {
      title: todo,
      done: false,
    });
    setTodo("");
  };

  const renderItem = ({ item }) => {
    const ref = doc(FIREBASE_DB, `todos/${item.id}`);

    const deleteItem = async () => {
      await deleteDoc(ref);
    };
    return (
      <View style={styles.render}>
        <TouchableOpacity style={styles.dataview}>
          <Text>{item.title}</Text>
        </TouchableOpacity>
        <Button title="Delete" onPress={() => deleteItem()} />
      </View>
    );
  };

  const onPressNext = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.main}>
      <View style={styles.innerview}>
        <TextInput
          placeholder="Add a todo"
          style={styles.input}
          placeholderTextColor={"white"}
          value={todo}
          onChangeText={(text) => setTodo(text)}
        />
        <TouchableOpacity
          style={styles.btnsty}
          onPress={() => addTodo()}
          disabled={todo === ""}
        >
          <Text>Add todos</Text>
        </TouchableOpacity>
      </View>
      {todos.length > 0 && (
        <View>
          <FlatList
            data={todos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
      <Button title="Next Page" onPress={onPressNext} />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "salmon",
  },
  input: {
    width: "70%",
    height: 60,
    margin: 12,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    alignItems: "center",
  },
  btnsty: { backgroundColor: "skyblue", padding: 10, borderRadius: 10 },
  innerview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dataview: {
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "60%",
  },
  render: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
});
