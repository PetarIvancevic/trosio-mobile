import _ from 'lodash'
import React, {Component} from 'react'
import {
  DrawerItems,
  SafeAreaView
} from 'react-navigation'
import {AsyncStorage, ScrollView, Image, StyleSheet, Text, View} from 'react-native'

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
    this.state = {items: props.items, user: {}}
  }

  async getDrawerItems () {
    const initialDrawerItemKeys = [
      'Home',
      'Login',
      'Categories',
      'Wallets',
      'Logout'
    ]

    const user = JSON.parse(await AsyncStorage.getItem('user'))

    const initialDrawerItems = _.filter(this.props.items, function (item) {
      return _.includes(initialDrawerItemKeys, item.key)
    })

    return _.filter(
      initialDrawerItems,
      user ? removeLoginRoute : justShowLoginRoute
    )
  }

  async componentWillMount () {
    await this.setState({items: await this.getDrawerItems()})
  }

  async componentWillUpdate () {
    const items = await this.getDrawerItems()
    const user = JSON.parse(await AsyncStorage.getItem('user'))

    if (!_.isEqual(items, this.state.items)) {
      await this.setState({items})
    }

    if (!_.isEqual(user, this.state.user)) {
      await this.setState({user})
    }
  }

  async componentWillUnmount () {
    await this.setState({items: [], user: {}})
  }

  render () {
    const {user} = this.state

    return (
      <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          {!_.isEmpty(user) &&
            <View style={styles.userDataContainer}>
              <Image
                style={styles.userImage}
                source={{uri: user.photo}}
              />
              <Text style={styles.userInfo}>{user.name}</Text>
            </View>}
          <DrawerItems {...this.props} items={this.state.items}/>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

export default DrawerComponent
