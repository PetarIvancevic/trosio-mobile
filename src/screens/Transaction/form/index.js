import _ from 'lodash'
import React, {Component} from 'react'
import {
  Button,
  Picker,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import TransactionForm from '../../../forms/Transaction'
import errUtils from '../../../utils/error'
import fetch from '../../../utils/fetch'
import LoadingScreen from '../../LoadingScreen'
import styles from './styles'

class TransactionParentForm extends Component<Props> {
  constructor (props) {
    super(props)

    this.submit = this.submit.bind(this)

    this.state = {
      categories: [],
      data: {},
      errors: {},
      fetching: true,
      isSubmiting: false,
      wallets: []
    }
  }

  async componentDidMount () {
    const {navigation} = this.props
    const transactionId = navigation.getParam('transactionId')
    const walletId = navigation.getParam('walletId')
    let transactionData = {}
    let wallets = {}

    const categories = _.get(await fetch.get('category'), 'data')

    if (transactionId) {
      transactionData = _.get(await fetch.get(`wallet/${walletId}/transaction/${transactionId}`), 'data')
    }

    if (!walletId) {
      wallets = _.get(await fetch.get('wallet'), 'data')
    }

    await this.setState({
      categories,
      data: transactionData,
      fetching: false,
      wallets
    })
  }

  async submit (data) {
    const {navigation} = this.props

    if (this.state.isSubmiting) return

    await this.setState({isSubmiting: true})

    const transactionId = navigation.getParam('transactionId')
    const walletId = data.walletId || navigation.getParam('walletId')

    const requestData = transactionId ? {
      method: 'put',
      url: `wallet/${walletId}/transaction/${transactionId}`,
    } : {
      method: 'post',
      url: `wallet/${walletId}/transaction`,
    }

    try {
      let transactionData = _.pick(data, [
        'amount',
        'categoryId',
        'comment',
        'date',
        'place'
      ])
      const response = await fetch[requestData.method](requestData.url, transactionData)

      if (!_.get(response, 'error')) {
        return this.props.navigation.navigate('WalletShow', {walletId})
      }
      await this.setState({errors: errUtils.parseErrors(response)})
    } catch (err) {
      console.error(err)
    }
    await this.setState({isSubmiting: false})
  }

  componentWillUnmount () {
    const {navigation} = this.props

    navigation.setParams({
      transactionId: null,
      walletId: null
    })
  }

  render () {
    const {navigation} = this.props
    const transactionId = navigation.getParam('transactionId')
    const walletId = navigation.getParam('walletId')

    if (this.state.fetching) {
      return <LoadingScreen />
    }

    if (!_.size(this.state.wallets) && !walletId) {
      return (
        <View style={styles.body}>
          <Text style={styles.errorMessage}>You must first create a wallet!</Text>
        </View>
      )
    }

    return (
      <TransactionForm
        btnText={transactionId ? 'Update' : 'Create'}
        categories={this.state.categories}
        data={this.state.data}
        errors={this.state.errors}
        formTitle={`${transactionId ? 'Update' : 'Create'} Transaction`}
        isSubmiting={this.state.isSubmiting}
        submitFn={this.submit}
        wallets={this.state.wallets}
      />
    )
  }
}

export default TransactionParentForm
