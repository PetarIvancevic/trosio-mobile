import React from 'react'
import {createDrawerNavigator} from 'react-navigation'

import CategoryHomeScreen from './src/screens/Category'
import CategoryShow from './src/screens/Category/show'
import CategoryParentForm from './src/screens/Category/form'
import ErrorPage from './src/screens/Error'
import HomeScreen from './src/screens/Home'
import LoginScreen from './src/screens/Login'
import LogoutScreen from './src/screens/Logout'
import DrawerComponent from './src/components/Drawer'
import WalletParentForm from './src/screens/Wallet/form'
import WalletHome from './src/screens/Wallet'

export default createDrawerNavigator({
  Home: HomeScreen,
  Categories: CategoryHomeScreen,
  CategoryParentForm: CategoryParentForm,
  CategoryShow: CategoryShow,
  ErrorPage: ErrorPage,
  Wallets: WalletHome,
  Login: LoginScreen,
  Logout: LogoutScreen,
  WalletParentForm: WalletParentForm,
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
