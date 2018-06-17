import React, {Component} from 'react'
import {Button, Text, TouchableOpacity, View} from 'react-native'

import fetch from '../../utils/fetch'
import styles from './styles'

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
        <Button
          onPress={this.mainNavigator('WalletCreate')}
          color="#841584"
          title={'Create Wallet'}
        />
      </View>
    )
  }
}

export default Home
