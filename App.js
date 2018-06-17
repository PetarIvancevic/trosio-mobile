import React from 'react'
import {createDrawerNavigator} from 'react-navigation'

import HomeScreen from './src/screens/Home'
import LoginScreen from './src/screens/Login'
import LogoutScreen from './src/screens/Logout'
import DrawerComponent from './src/components/Drawer'
import WalletCreateScreen from './src/screens/Wallet/create'

export default createDrawerNavigator({
  Home: HomeScreen,
  Login: LoginScreen,
  Logout: LogoutScreen,
  WalletCreate: WalletCreateScreen,
}, {
  initialRouteName: 'Login',
  drawerPosition: 'right',
  contentOptions: {
    activeBackgroundColor: '#efe',
    activeTintColor: '#e91e63',
    itemsContainerStyle: {
      marginVertical: 0,
    },
    iconContainerStyle: {
      opacity: 1
    }
  },
  contentComponent: DrawerComponent,
})
