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

class WalletParentForm extends Component<Props> {
  constructor (props) {
    super(props)

    this.submit = this.submit.bind(this)
    this.state = {
      categories: [],
      isSubmiting: false
    }
  }

  async componentWillMount () {
    const categories = await fetch.get('category')
    this.setState({categories: categories.data})
  }

  async submit (data) {
    let error, response
    await this.setState({isSubmiting: true})

    try {
      response = await fetch.post('wallet', {
        ..._.omit(data, ['error']),
        balance: _.toNumber(data.balance),
        paycheckAmount: _.toNumber(data.paycheckAmount),
        currency: _.toNumber(data.currency),
        paycheckDay: _.toNumber(data.paycheckDay),
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
        categories={this.state.categories}
        formTitle="Create Wallet"
        isSubmiting={this.state.isSubmiting}
        submitFn={this.submit}
      />
    )
  }
}

export default WalletParentForm
