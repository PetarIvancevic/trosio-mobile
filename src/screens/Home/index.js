import React, {Component} from 'react'
import {Button, Text, TouchableOpacity, View} from 'react-native'

import fetch from '../../utils/fetch'
import LoadingScreen from '../LoadingScreen'
import styles from './styles'
import TouchableContent from '../../components/TouchableContent'

class Home extends Component<Props> {
  constructor () {
    super()

    this.mainNavigator = this.mainNavigator.bind(this)
  }

  mainNavigator (route) {
    const {navigation} = this.props

    return function () {
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
