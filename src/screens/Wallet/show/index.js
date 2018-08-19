import React, {Component} from 'react'
import {Button, FlatList, Text, View} from 'react-native'

import fetch from '../../../utils/fetch'
import LoadingScreen from '../../LoadingScreen'
import ModalComponent from '../../../components/Modal'
import styles from './styles'
import TouchableContent from '../../../components/TouchableContent'

class WalletShow extends Component<Props> {
  constructor (props) {
    super(props)

    this.mainNavigator = this.mainNavigator.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.deleteModal = this.deleteModal.bind(this)
    this.state = {
      wallet: {},
      isModalOpen: false,
      fetching: true
    }
  }

  async componentDidMount () {
    const {navigation} = this.props
    const walletId = navigation.getParam('walletId')
    const {data: wallet} = await fetch.get(`wallet/${walletId}`)

    await this.setState({
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
