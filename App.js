import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReduxApp from "./app/ReduxApp/ReduxApp";
import { Provider } from "react-redux";
import store from "./app/ReduxApp/redux/store";
import CartUi from "./app/ReduxApp/CartUi";
import Video1 from "./app/Video/Video1";
import AudioPlay from "./app/AudioPlay/AudioPlay";
import Page1 from "./app/AudioPlay/Page1";
import Page2 from "./app/AudioPlay/Page2";
import Page3 from "./app/AudioPlay/Page3";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Page1" component={Page1} />
          <Stack.Screen name="Page2" component={Page2} />
          <Stack.Screen name="Page3" component={Page3} />
          <Stack.Screen name="AudioPlay" component={AudioPlay} />
          <Stack.Screen name="Video1" component={Video1} />
          <Stack.Screen name="ReduxApp" component={ReduxApp} />
          <Stack.Screen name="CartUi" component={CartUi} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
