import { View, Button } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Logout = ({ navigation }) => {

  let myfun = async () => {
    await AsyncStorage.removeItem("token");

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }

  return (
    <View>
      <Button title='Logout' onPress={myfun} />
    </View>
  )
}

export default Logout