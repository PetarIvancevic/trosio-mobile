import _ from 'lodash'
import React, {Component} from 'react'
import {
  Button,
  Picker,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import fetch from '../../../utils/fetch'
import errUtils from '../../../utils/error'
import WalletForm from '../../../forms/Wallet'
import LoadingScreen from '../../LoadingScreen'

class WalletParentForm extends Component<Props> {
  constructor (props) {
    super(props)

    this.submit = this.submit.bind(this)
    this.state = {
      errors: {},
      data: {},
      fetching: true,
      isSubmiting: false
    }
  }

  async componentDidMount () {
    const {navigation} = this.props
    const walletId = navigation.getParam('walletId')
    let walletData = {}

    if (walletId) {
      walletData = _.get(await fetch.get(`wallet/${walletId}`), 'data')
    }

    await this.setState({
      data: walletData,
      fetching: false
    })
  }

  componentWillUnmount () {
    const {navigation} = this.props

    navigation.setParams({walletId: null})
  }

  async submit (data) {
    const {navigation} = this.props

    if (this.state.isSubmiting) return

    await this.setState({isSubmiting: true})

    const walletId = navigation.getParam('walletId')

    const requestData = walletId ? {
      method: 'put',
      url: `wallet/${walletId}`,
    } : {
      method: 'post',
      url: 'wallet',
    }

    console.log('pa sta je data', data)
    try {
      const dataObj = {
        name: data.name,
        balance: _.toNumber(data.balance || ''),
        paycheckAmount: _.toNumber(data.paycheckAmount || ''),
        currency: _.toNumber(data.currency),
        paycheckDay: _.toNumber(data.paycheckDay),
      }

      const response = await fetch[requestData.method](
        requestData.url,
        _.omit(dataObj, walletId ? ['balance'] : [])
      )

      if (!_.get(response, 'error')) {
        return this.props.navigation.navigate('Wallets')
      }
      await this.setState({errors: errUtils.parseErrors(response)})
    } catch (err) {
      console.error(err)
    }
    await this.setState({isSubmiting: false})
  }

  render () {
    const {navigation} = this.props
    const walletId = navigation.getParam('walletId')

    if (this.state.fetching) {
      return <LoadingScreen />
    }

    return (
      <ScrollView>
        <WalletForm
          errors={this.state.errors}
          data={this.state.data}
          isUpdate={!!walletId}
          btnText={walletId ? 'Update' : 'Create'}
          formTitle={`${walletId ? 'Update' : 'Create'} Wallet`}
          isSubmiting={this.state.isSubmiting}
          submitFn={this.submit}
        />
      </ScrollView>
    )
  }
}

export default WalletParentForm
