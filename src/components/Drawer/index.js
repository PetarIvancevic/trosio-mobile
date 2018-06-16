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

    this.getDrawerItems = this.getDrawerItems.bind(this)
    this.state = {items: props.items}
  }

  async getDrawerItems () {
    const user = JSON.parse(await AsyncStorage.getItem('user'))

    return _.filter(
      this.props.items,
      user ? removeLoginRoute : justShowLoginRoute
    )
  }

  async componentWillMount () {
    this.setState({items: await this.getDrawerItems()})
  }

  async componentWillUpdate () {
    this.setState({items: await this.getDrawerItems()})
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
