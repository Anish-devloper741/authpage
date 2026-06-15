import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigation from "./src/navigations/stackNavigation";
import DrawerNavigator from "./src/navigations/drawerNavigation";
import { View } from "react-native";


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    let token = await AsyncStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  if (isLoggedIn === null) {
    return null;
  }

  return (
    
    <NavigationContainer>
      
      {isLoggedIn ? <DrawerNavigator /> : <Navigation />}
      
    </NavigationContainer>
   
  );
};

export default App;