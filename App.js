import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReduxApp from "./app/ReduxApp/ReduxApp";
import { Provider } from "react-redux";
import store from "./app/ReduxApp/redux/store";
import CartUi from "./app/ReduxApp/CartUi";
import Video1 from "./app/Video/Video1";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Video1" component={Video1} />
          <Stack.Screen name="ReduxApp" component={ReduxApp} />
          <Stack.Screen name="CartUi" component={CartUi} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
