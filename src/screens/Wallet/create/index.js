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

import styles from './styles'
import fetch from '../../../utils/fetch'
import WalletForm from '../../../forms/Wallet'

class WalletCreate extends Component<Props> {
  constructor (props) {
    super(props)

    this.submit = this.submit.bind(this)

    this.state = {isSubmiting: false}
  }

  async submit (data) {
    let error, response
    await this.setState({isSubmiting: true})

    try {
      response = await fetch({
        url: 'wallet',
        body: {
          ..._.omit(data, ['error']),
          amount: _.toNumber(data.amount),
          currency: _.toNumber(data.currency),
          initialAmount: _.toNumber(data.initialAmount),
          paycheckDay: _.toNumber(data.paycheckDay),
        },
        method: 'POST',
      })

      if (!_.get(response, 'error')) {
        return this.props.navigation.navigate('Home')
      }
      error = _.get(response, 'data')
    } catch (err) {
      error = err
    }
    this.setState({isSubmiting: false})
  }

  render () {
    return (
      <WalletForm
        formTitle="Create Wallet"
        isSubmiting={this.state.isSubmiting}
        submitFn={this.submit}
      />
    )
  }
}

export default WalletCreate
