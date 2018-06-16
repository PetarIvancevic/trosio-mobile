import React, { Component} from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  View
} from 'react-native'

import styles from './styles'
import styleVars from '../../styles/variables'

export default class Home extends Component<Props> {
  async componentWillMount () {
    const {navigation} = this.props

    await AsyncStorage.removeItem('user')
    navigation.navigate('Login')
    console.log(navigation)
  }

  render () {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size={80} color={styleVars.color.white} />
      </View>
    )
  }
}
