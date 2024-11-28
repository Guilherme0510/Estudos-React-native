import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { MaterialCommunityIcons } from "react-native-vector-icons"; // Exemplo de ícones
import { Details } from "../screens/Details";
import { MyList } from "../screens/MyList";
import { Search } from "../screens/Search";

const Tab = createBottomTabNavigator();

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
        name="Detalhes" 
        component={Details} 
        options={{
          tabBarButton: () => null,
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
