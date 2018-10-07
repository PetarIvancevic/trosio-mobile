import React, {Component} from 'react'
import {Button, FlatList, Text, TouchableOpacity, View} from 'react-native'

import fetch from '../../../utils/fetch'
import LoadingScreen from '../../LoadingScreen'
import ModalComponent from '../../../components/Modal'
import styles from './styles'
import TouchableContent from '../../../components/TouchableContent'
import utils from '../../../utils/generic'

class WalletShow extends Component<Props> {
  constructor (props) {
    super(props)

    this.deleteModal = this.deleteModal.bind(this)
    this.mainNavigator = this.mainNavigator.bind(this)
    this.renderItemFn = this.renderItemFn.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.state = {
      transactions: [],
      wallet: {},
      isModalOpen: false,
      fetching: true
    }
  }

  async componentDidMount () {
    const {navigation} = this.props
    const walletId = navigation.getParam('walletId')
    const {data: wallet} = await fetch.get(`wallet/${walletId}`)
    const {data: transactions} = await fetch.get(`wallet/${walletId}/transaction`)

    await this.setState({
      transactions: transactions || [],
      wallet,
      fetching: false
    })
  }

  mainNavigator (route, params = {}) {
    const {navigation} = this.props

    return function () {
      return navigation.navigate(route, params)
    }
  }

  async deleteModal () {
    const {navigation} = this.props
    const walletId = navigation.getParam('walletId')

    const {data} = await fetch.delete(`wallet/${walletId}`)
    return navigation.navigate('Wallets')
  }

  toggleModal () {
    return this.setState({isModalOpen: !this.state.isModalOpen})
  }

  renderItemFn (listItem) {
    const transaction = listItem.item
    return (
      <TouchableOpacity
        key={`listedTransaction${transaction.id}`}
        onPress={this.mainNavigator('TransactionParentForm', {
          transactionId: transaction.id,
          walletId: transaction.walletId
        })}>
        <View style={styles.transactionListItemContainer}>
          <View style={styles.transactionListItemPlace}>
            <Text style={styles.fullRowText}>
              kategorija {transaction.categoryId}
            </Text>
            <Text style={styles.fullRowText}>
              lokacija {transaction.place}
            </Text>
          </View>
            <Text style={styles.transactionListItemAmount}>{transaction.amount}</Text>
            <Text style={styles.transactionListItemDate}>{utils.formatDate(transaction.date)}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  headerComponent () {
    return (
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text style={{flex: 0.5}}>Category/Place</Text>
        <Text style={{flex: 0.25}}>Amount</Text>
        <Text style={{flex: 0.25}}>Date</Text>
      </View>
    )
  }

  emptyTransactionList () {
    return (
      <View key='listedWallet0'>
        <Text>There are no transactions for this wallet</Text>
      </View>
    )
  }

  render () {
    const {navigation} = this.props
    const walletId = navigation.getParam('walletId')
    const {wallet} = this.state

    if (this.state.fetching) {
      return <LoadingScreen />
    }

    return (
      <View style={styles.body}>
        <Text style={styles.walletName}>{wallet.name}</Text>

        <TouchableContent
          onPressFn={this.mainNavigator('WalletParentForm', {walletId})}
          content={
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonStyle}>Edit</Text>
            </View>}
        />

        <TouchableContent
          onPressFn={this.toggleModal}
          content={
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonStyle}>Delete</Text>
            </View>}
        />

        <Text>
          Balance: {wallet.balance}
        </Text>
        <Text>
          Paycheck day: {wallet.paycheckDay}
        </Text>
        <Text>
          Paycheck Amount: {wallet.paycheckAmount}
        </Text>

        <FlatList
          data={this.state.transactions}
          renderItem={this.renderItemFn}
          ListEmptyComponent={this.emptyTransactionList}
          ListHeaderComponent={this.headerComponent}
        />

        {this.state.isModalOpen && <ModalComponent
          message={`Are you sure you want to delete "${wallet.name}" wallet`}
          confirmFn={this.deleteModal}
          closeModalFn={this.toggleModal}
        />}
      </View>
    )
  }
}

export default WalletShow
