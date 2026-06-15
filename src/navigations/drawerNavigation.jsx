import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {Home} from "../screens/home";
import {Logout} from "../auth/logout";
import Profile from "../screens/profile";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <SafeAreaView style={{flex:1}}>
     
    <Drawer.Navigator>
      <Drawer.Screen  name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile}/>
      <Drawer.Screen name="Logout" component={Logout}/>
    </Drawer.Navigator>
   
    </SafeAreaView>
  );
};

export default DrawerNavigator;