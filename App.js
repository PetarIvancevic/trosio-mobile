import React from 'react'
import {createDrawerNavigator} from 'react-navigation'

import CategoryHomeScreen from './src/screens/Category'
import CategoryParentForm from './src/screens/Category/form'
import CategoryShow from './src/screens/Category/show'
import DrawerComponent from './src/components/Drawer'
import ErrorPage from './src/screens/Error'
import HomeScreen from './src/screens/Home'
import LoginScreen from './src/screens/Login'
import LogoutScreen from './src/screens/Logout'
import TransactionParentForm from './src/screens/Transaction/form'
import WalletHome from './src/screens/Wallet'
import WalletParentForm from './src/screens/Wallet/form'
import WalletShow from './src/screens/Wallet/show'

export default createDrawerNavigator({
  Home: HomeScreen,
  Categories: CategoryHomeScreen,
  CategoryParentForm: CategoryParentForm,
  TransactionParentForm: TransactionParentForm,
  CategoryShow: CategoryShow,
  WalletShow: WalletShow,
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
