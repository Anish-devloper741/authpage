import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {Home} from "./home";
import {Logout} from "./logout";
import Profile from "./profile";
import { SafeAreaView } from "react-native-safe-area-context";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <SafeAreaView style={{flex:1}}>
    <Drawer.Navigator
  screenOptions={{
    sceneContainerStyle: {
      backgroundColor: '#121212',
    },
  }}
>
      <Drawer.Screen  name="Home" component={Home} />
      <Drawer.Screen options={{drawerStyle:{
        backgroundColor:"#000"
      }}} name="Profile" component={Profile}/>
      <Drawer.Screen name="Logout" component={Logout}/>
    </Drawer.Navigator>
    </SafeAreaView>
  );
};

export default DrawerNavigator;