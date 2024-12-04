import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack"; 
import { MaterialCommunityIcons } from "react-native-vector-icons"; 
import { Home } from "../screens/Home";
import { Details } from "../screens/Details";
import { MyList } from "../screens/MyList";
import { Search } from "../screens/Search";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabRoutes" component={TabRoutes} />
      <Stack.Screen name="Detalhes" component={Details} />
    </Stack.Navigator>
  );
}

// Definindo as rotas de Tab
export function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#242a40",
          height: 78,
          alignItems: "center",
          borderTopWidth: 1,
          borderTopColor: "#0296e5",
        },
        tabBarActiveTintColor: "#0296e5",
        tabBarInactiveTintColor: "#ffffff",
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Minha Lista" 
        component={MyList} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bookmark" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Pesquisa" 
        component={Search} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export { AppStack };
