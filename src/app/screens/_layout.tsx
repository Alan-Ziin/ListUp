import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from './home'; // Crie suas telas em 'screens/'
import Tabs from './tabs';
import { StyleSheet, Text } from 'react-native';

const Tab = createMaterialTopTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
    
      tabBarPosition="bottom"
      screenOptions={({ route, navigation }) => ({
        tabBarStyle: {
          backgroundColor: "#010d23",
        },
        tabBarLabel: ({ focused }) => (
          <Text style={{
            fontSize: focused ? 16 : 14,
            fontWeight: focused ? "bold" : "normal",
            color: focused ? "#ffffff" : "#888888",
            textShadowColor: "#000000",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          }}>
            {route.name}
          </Text>
        )
      })}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="List" component={Tabs} />
      </Tab.Navigator >
  )
};
const styles = StyleSheet.create({
  tabNavegar: {
    fontWeight: "bold",
    fontSize: 14,
  }
})

export default AppNavigator;