import React, {Component} from 'react'
import {Button, FlatList, Text, TouchableOpacity, View} from 'react-native'

import fetch from '../../utils/fetch'
import styles from './styles'

import LoadingScreen from '../LoadingScreen'

class WalletHome extends Component<Props> {
  constructor (props) {
    super(props)

    this.mainNavigator = this.mainNavigator.bind(this)
    this.renderItemFn = this.renderItemFn.bind(this)
    this.state = {
      fetching: true,
      wallets: []
    }
  }

  async componentDidMount () {
    const {data: wallets} = await fetch.get('wallet')
    this.setState({
      fetching: false,
      wallets: wallets || []
    })
  }

  mainNavigator (route, params = {}) {
    const {navigation} = this.props

    return function () {
      navigation.navigate(route, params)
    }
  }

  renderItemFn (listItem) {
    const wallet = listItem.item
    return (
      <TouchableOpacity onPress={this.mainNavigator('WalletShow', {walletId: wallet.id})}>
        <View>
          <Text style={{
            fontSize: 20,
            lineHeight: 30
          }}>
            {wallet.name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    if (this.state.fetching) {
      return <LoadingScreen />
    }

    return (
      <View style={styles.body}>
        <Button
          onPress={this.mainNavigator('WalletParentForm')}
          color="#841584"
          title={'Create Wallet'}
        />
        {this.state.wallets.length === 0 ?
          <Text style={{fontSize: 20}}>Loading...</Text> :
          <FlatList
            data={this.state.wallets}
            renderItem={this.renderItemFn}
          />
        }
      </View>
    )
  }
}

export default WalletHome
