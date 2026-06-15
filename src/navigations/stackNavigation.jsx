import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Registration from "../auth/registration ";
import Login from "../auth/login";
import {SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import DrawerNavigator from "./drawerNavigation";

let Stack = createStackNavigator();

const Navigation = () => {
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <Stack.Navigator>
        
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={Registration}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignIn"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MainScreen"
          component={DrawerNavigator}
        />
      
      </Stack.Navigator>
    </SafeAreaView>
 
    
  );
};

export default Navigation;
