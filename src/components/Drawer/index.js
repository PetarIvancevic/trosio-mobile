import _ from 'lodash'
import React, {Component} from 'react'
import {
  DrawerItems,
  SafeAreaView
} from 'react-navigation'
import {AsyncStorage, ScrollView, StyleSheet} from 'react-native'

import styles from './styles'

function removeLoginRoute (item) {
  return item.key !== 'Login'
}

function justShowLoginRoute (item) {
  return item.key === 'Login'
}

class DrawerComponent extends Component<Props> {
  constructor (props) {
    super(props)

    this.state = {items: props.items}
  }

  async componentWillMount () {
    const user = JSON.parse(await AsyncStorage.getItem('user'))

    const updatedDrawerItems = _.filter(
      this.props.items,
      user ? removeLoginRoute : justShowLoginRoute
    )
    this.setState({items: updatedDrawerItems})
  }

  render () {
    return (
      <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems {...this.props} items={this.state.items}/>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

export default DrawerComponent
