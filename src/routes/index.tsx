import { NavigationContainer } from "@react-navigation/native";
import { AppStack, TabRoutes } from "./tabs.routes";


export function Routes() {
    return(
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    )
}