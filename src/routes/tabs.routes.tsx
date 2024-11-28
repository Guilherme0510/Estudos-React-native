import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";

const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Navigator
    screenOptions={{
        tabBarStyle:{
            backgroundColor: "#242a40",
            height: 78,
            alignItems: "center",
            borderTopWidth: 1,
            borderTopColor: "#0296e5"
        }
    }}>
      <Screen name="Home" component={Home} />
    </Navigator>
  );
}
