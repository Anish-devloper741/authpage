
import { StatusBar } from "react-native"
import {createStackNavigator} from "@react-navigation/stack";
import Registration from "./components/registration "
import Login from "./components/login";
import { SafeAreaView } from "react-native-safe-area-context";
import Home from "./components/home";
import DrawerNavigator from "./components/drawerNavigation";

let Stack = createStackNavigator(); 



const Navigation = () => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"black"}}>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown : false}}  name="Register" component={Registration} />
        <Stack.Screen options={{headerShown : false}}  name="Login" component={Login} />
        <Stack.Screen options={{headerShown:false}} name="MainScreen" component={DrawerNavigator} />
   </Stack.Navigator>

   </SafeAreaView>

  )
}

export default Navigation;