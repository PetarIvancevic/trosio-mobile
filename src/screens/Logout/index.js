import React, { Component} from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  View
} from 'react-native'
import {GoogleSignin} from 'react-native-google-signin'

import styles from './styles'
import styleVars from '../../styles/variables'

import LoadingScreen from '../LoadingScreen'

export default class Home extends Component<Props> {
  async componentWillMount () {
    const {navigation} = this.props

    await GoogleSignin.configure({})
    await AsyncStorage.removeItem('user')
    await GoogleSignin.signOut()
    return navigation.navigate('Login')
  }

  render () {
    return <LoadingScreen />
  }
}
