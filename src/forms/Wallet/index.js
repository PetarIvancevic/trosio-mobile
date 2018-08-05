import _ from 'lodash'
import React, {Component} from 'react'
import {
  ActivityIndicator,
  Button,
  Picker,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import styles from './styles'
import styleVars from '../../styles/variables'
import CurrencyPicker from '../../components/CurrencyPicker'
import PayDayComponent from '../../components/PayDay'

class WalletForm extends Component<Props> {
  constructor (props) {
    super(props)

    this.submit = this.submit.bind(this)
    this.updateCurrency = this.updateCurrency.bind(this)
    this.updatePayDay = this.updatePayDay.bind(this)

    this.state = {
      amount: _.get(props, 'defaultValues.amount', '0'),
      currency: _.get(props, 'defaultValues.currency', '10'),
      initialAmount: _.get(props, 'defaultValues.initialAmount', '0'),
      name: _.get(props, 'defaultValues.name', ''),
      paycheckDay: _.get(props, 'defaultValues.paycheckDay', '1'),
    }
  }

  updatePayDay (paycheckDay, index) {
    this.setState({paycheckDay})
  }

  updateCurrency (currency, index) {
    console.log('selected', currency)
    this.setState({currency})
  }

  submit () {
    this.props.submitFn(this.state)
  }

  render () {
    if (this.props.isSubmiting) {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size={80} color={styleVars.color.white} />
        </View>
      )
    }

    return (
      <View>
        <View>
          <Text>
            {this.props.formTitle}
          </Text>
        </View>

        <View>
          <Text>
            Name:
          </Text>
          <TextInput
            style={{height: 40}}
            placeholder='Name...'
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
          />
        </View>

        <CurrencyPicker
          selectedCurrency={this.state.currency}
          updateStateFn={this.updateCurrency}
        />

        <View>
          <Text>
            Initial wallet amount:
          </Text>
          <TextInput
            keyboardType='numeric'
            onChangeText={(initialAmount)=> this.setState({initialAmount})}
            value={this.state.initialAmount}
          />
        </View>

        <PayDayComponent
          selectedPayCheckDay={this.state.paycheckDay}
          updateStateFn={this.updatePayDay}
        />

        <View>
          <Text>
            Pay amount:
          </Text>
          <TextInput
            keyboardType='numeric'
            onChangeText={(amount)=> this.setState({amount})}
            value={this.state.amount}
          />
        </View>

        <View>
          <Button
            onPress={this.submit}
            color="#841584"
            title={'Create Wallet'}
          />
        </View>
      </View>
    )
  }
}

export default WalletForm
