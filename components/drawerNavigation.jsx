import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {Home} from "./home";
import Logout from "./logout";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Logout" component={Logout}/>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;