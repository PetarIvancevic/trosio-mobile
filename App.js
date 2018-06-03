import React from 'react'
import {createStackNavigator} from 'react-navigation'

import HomeScreen from './src/screens/Home'
import LoginScreen from './src/screens/Login'
import NavigationComponent from './src/components/Navigation'

export default createStackNavigator({
  Home: HomeScreen,
  Login: LoginScreen
}, {
  initialRouteName: 'Login',
  navigationOptions: {
    headerTitle: <NavigationComponent />,
    headerMode: 'screen'
  }
})
