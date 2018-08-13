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

import CategoryPicker from '../../components/CategoryPicker'
import CurrencyPicker from '../../components/CurrencyPicker'
import PayDayComponent from '../../components/PayDay'
import styles from './styles'
import styleVars from '../../styles/variables'

class WalletForm extends Component<Props> {
  constructor (props) {
    super(props)

    this.submit = this.submit.bind(this)
    this.updateStateFn = this.updateStateFn.bind(this)

    this.state = {
      currency: '10',
      balance: '0',
      name: '',
      paycheckAmount: '0',
      paycheckDay: '1',
    }
  }

  updateStateFn (stateProperty) {
    return (value) => {
      this.setState({[stateProperty]: value})
    }
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
            onChangeText={this.updateStateFn('name')}
            value={this.state.name}
          />
        </View>

        <CategoryPicker
          selectedCategory={this.state.categoryId}
          categories={this.props.categories}
          updateStateFn={this.updateStateFn('categoryId')}
        />

        <CurrencyPicker
          selectedCurrency={this.state.currency}
          updateStateFn={this.updateStateFn('currency')}
        />

        <View>
          <Text>
            Wallet initial balance:
          </Text>
          <TextInput
            keyboardType='numeric'
            onChangeText={this.updateStateFn('balance')}
            value={this.state.balance}
          />
        </View>

        <PayDayComponent
          selectedPayCheckDay={this.state.paycheckDay}
          updateStateFn={this.updateStateFn('paycheckDay')}
        />

        <View>
          <Text>
            Paycheck amount:
          </Text>
          <TextInput
            keyboardType='numeric'
            onChangeText={this.updateStateFn('paycheckAmount')}
            value={this.state.paycheckAmount}
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
