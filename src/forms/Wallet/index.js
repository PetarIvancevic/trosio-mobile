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
import PropTypes from 'prop-types'

import CategoryPicker from '../../components/CategoryPicker'
import consts from '../../consts'
import CurrencyPicker from '../../components/CurrencyPicker'
import PayDayComponent from '../../components/PayDay'
import styles from './styles'
import styleVars from '../../styles/variables'
import TextInputComponent from '../../components/TextInput'
import TouchableContent from '../../components/TouchableContent'

class WalletForm extends Component<Props> {
  constructor (props) {
    super(props)

    this.submit = this.submit.bind(this)
    this.updateStateFn = this.updateStateFn.bind(this)

    this.state = {
      balance: '',
      currency: 10,
      name: '',
      paycheckAmount: '',
      paycheckDay: 1,
      ..._.pick(props.data, [
        'balance',
        'currency',
        'name',
        'paycheckAmount',
        'paycheckDay'
      ])
    }
  }

  updateStateFn (stateProperty, type) {
    return (value) => {
      let newValue = type === 'numeric' ? _.toNumber(value) : value
      this.setState({[stateProperty]: newValue})
    }
  }

  submit () {
    this.props.submitFn(this.state)
  }

  render () {
    const {isUpdate, isSubmiting} = this.props

    return (
      <View style={styles.body}>
        <View>
          <Text style={styles.formHeading}>
            {this.props.formTitle}
          </Text>
        </View>

        <TextInputComponent
          errorMsg={consts.errors.messages.wallet.name[_.get(this.props.errors, 'name')]}
          inputName='Name'
          placeholder='Wallet name...'
          updateStateFn={(name) => this.setState({name})}
          value={this.state.name}
        />

        <CurrencyPicker
          selectedCurrency={_.toString(this.state.currency)}
          updateStateFn={this.updateStateFn('currency', 'numeric')}
        />

        {!isUpdate && <TextInputComponent
          errorMsg={consts.errors.messages.wallet.balance[_.get(this.props.errors, 'balance')]}
          inputName='Wallet initial balance'
          keyboardType='numeric'
          placeholder='4000'
          updateStateFn={this.updateStateFn('balance', 'numeric')}
          value={_.toString(this.state.balance)}
        />}

        <PayDayComponent
          selectedPayCheckDay={_.toString(this.state.paycheckDay)}
          updateStateFn={this.updateStateFn('paycheckDay', 'numeric')}
        />

        <TextInputComponent
          errorMsg={consts.errors.messages.wallet.paycheckAmount[_.get(this.props.errors, 'paycheckAmount')]}
          inputName='Paycheck amount'
          keyboardType='numeric'
          placeholder='2500'
          updateStateFn={this.updateStateFn('paycheckAmount', 'numeric')}
          value={_.toString(this.state.paycheckAmount)}
        />

        <View>
          <Text style={styles.errorText}>
            {_.get(consts.errors.messages, this.props.errors)}
          </Text>
        </View>

        <TouchableContent
          onPressFn={this.submit}
          content={
            <View style={styles.buttonContainer}>
              {isSubmiting
                ? <ActivityIndicator size={13} color={styleVars.color.white} />
                : <Text style={styles.buttonStyle}>{this.props.btnText}</Text>}
            </View>
          }
        />
      </View>
    )
  }
}

WalletForm.propTypes = {
  error: PropTypes.object,
  data: PropTypes.object,
  btnText: PropTypes.string,
  formTitle: PropTypes.string,
  isUpdate: PropTypes.bool,
  isSubmiting: PropTypes.bool,
  submitFn: PropTypes.func.isRequired
}

export default WalletForm
