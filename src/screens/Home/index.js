import React, {Component} from 'react'
import {Text, View} from 'react-native'

import styles from './styles'

export default class Home extends Component<Props> {
  render () {
    return (
      <View style={styles.body}>
        <Text>Home screen!</Text>
      </View>
    )
  }
}
