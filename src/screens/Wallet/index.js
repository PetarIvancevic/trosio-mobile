import React, {Component} from 'react'
import {ActivityIndicator, Button, FlatList, Text, TouchableOpacity, View} from 'react-native'

import fetch from '../../utils/fetch'
import styles from './styles'
import styleVars from '../../styles/variables'

import LoadingScreen from '../LoadingScreen'
import TouchableContent from '../../components/TouchableContent'

class WalletHome extends Component<Props> {
  constructor () {
    super()

    this.mainNavigator = this.mainNavigator.bind(this)
    this.renderItemFn = this.renderItemFn.bind(this)
    this.state = {
      fetching: true,
      wallets: []
    }
  }

  async componentDidMount () {
    const {data: wallets} = await fetch.get('wallet')
    await this.setState({
      wallets: wallets || [],
      fetching: false
    })
  }

  mainNavigator (route, params = {}) {
    const {navigation} = this.props

    return function () {
      return navigation.navigate(route, params)
    }
  }

  renderItemFn (listItem) {
    const wallet = listItem.item
    return (
      <TouchableOpacity
        key={`listedWallet${wallet.id}`}
        onPress={this.mainNavigator('WalletShow', {walletId: wallet.id})}>
        <View style={styles.walletListItemContainer}>
          <Text style={styles.walletListItem}>
            {wallet.name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  headerComponent () {
    return (
      <View>
        <Text style={styles.header}>Wallet Name</Text>
      </View>
    )
  }

  emptyWalletList () {
    return (
      <View key='listedWallet0'>
        <Text>There are no wallets</Text>
      </View>
    )
  }

  render () {
    if (this.state.fetching) {
      return <LoadingScreen />
    }

    return (
      <View style={styles.body}>
        <TouchableContent
          onPressFn={this.mainNavigator('WalletParentForm')}
          content={
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonStyle}>Add Wallet</Text>
            </View>}
        />
        <FlatList
          data={this.state.wallets}
          renderItem={this.renderItemFn}
          ListEmptyComponent={this.emptyWalletList}
          ListHeaderComponent={this.headerComponent}
        />
      </View>
    )
  }
}

export default WalletHome

