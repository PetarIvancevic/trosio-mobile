import React, {Component} from 'react'
import {BackHandler, Button, Text, TouchableOpacity, View} from 'react-native'

import fetch from '../../utils/fetch'
import LoadingScreen from '../LoadingScreen'
import styles from './styles'
import TouchableContent from '../../components/TouchableContent'

class Home extends Component<Props> {
  constructor (props) {
    super(props)

    this.mainNavigator = this.mainNavigator.bind(this)
    this.onBackButtonPressAndroid = this.onBackButtonPressAndroid.bind(this)
    this._didFocusSubscription = this.props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    )
  }

  onBackButtonPressAndroid () {
    const {navigation} = this.props
    console.log('someone clicked back')
    console.log(this.state)
    navigation.navigate('Home')
    return true
  }

  mainNavigator (route) {
    const {navigation} = this.props

    return () => {
      navigation.navigate(route)
    }
  }

  render () {
    return (
      <View style={styles.body}>
        <TouchableContent
          onPressFn={this.mainNavigator('TransactionParentForm')}
          content={
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonStyle}>New Transaction</Text>
            </View>}
        />

        <TouchableContent
          onPressFn={this.mainNavigator('Wallets')}
          content={
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonStyle}>Wallets</Text>
            </View>}
        />

        <TouchableContent
          onPressFn={this.mainNavigator('Categories')}
          content={
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonStyle}>Categories</Text>
            </View>}
        />

      </View>
    )
  }
}

export default Home
