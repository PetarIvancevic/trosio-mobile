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
import DatePickerComponent from '../../components/DatePicker'
import styles from './styles'
import styleVars from '../../styles/variables'
import TextInputComponent from '../../components/TextInput'
import TouchableContent from '../../components/TouchableContent'
import TransactionTypePicker from '../../components/TransactionTypePicker'
import WalletPicker from '../../components/WalletPicker'

class TransactionForm extends Component<Props> {
  constructor (props) {
    super(props)

    this.submit = this.submit.bind(this)
    this.updateStateFn = this.updateStateFn.bind(this)

    this.state = {
      ..._.pick(props.data, [
        'amount',
        'categoryId',
        'comment',
        'date',
        'place'
      ]),
      type: _.get(props, 'data.type', 'withdrawal'),
      walletId: _.get(props, 'data.walletId') || _.get(_.first(props.wallets), 'id')
    }
  }

  submit () {
    this.props.submitFn(this.state)
  }

  updateStateFn (stateProperty, type) {
    return (value) => {
      let newValue = type === 'numeric' ? _.toNumber(value) : value
      this.setState({[stateProperty]: newValue})
    }
  }

  render () {
    const {isSubmiting} = this.props

    return (
      <View style={styles.body}>
        <View>
          <Text style={styles.formHeading}>
            {this.props.formTitle}
          </Text>
        </View>

        <WalletPicker
          enabled={_.isEmpty(this.props.data)}
          wallets={this.props.wallets}
          updateStateFn={this.updateStateFn('walletId', 'numeric')}
          selectedWallet={this.state.walletId}
        />

        <TransactionTypePicker
          updateStateFn={this.updateStateFn('type')}
          value={this.state.type}
        />

        <TextInputComponent
          errorMsg={consts.errors.messages.transaction.amount[_.get(this.props.errors, 'amount')]}
          inputName='Amount'
          placeholder='50'
          keyboardType='numeric'
          updateStateFn={this.updateStateFn('amount')}
          value={_(this.state).get('amount', '').toString()}
        />

        <CategoryPicker
          categories={this.props.categories}
          updateStateFn={this.updateStateFn('categoryId', 'numeric')}
          selectedCategory={this.state.categoryId}
        />

        <TextInputComponent
          errorMsg={consts.errors.messages.transaction.place[_.get(this.props.errors, 'place')]}
          inputName='Place'
          placeholder='Where am I spending?'
          updateStateFn={(place) => this.setState({place})}
          value={this.state.place}
        />

        <TextInputComponent
          errorMsg={consts.errors.messages.transaction.comment[_.get(this.props.errors, 'comment')]}
          inputName='Comment'
          placeholder='Additional comment...'
          updateStateFn={(comment) => this.setState({comment})}
          value={this.state.comment}
        />

        <DatePickerComponent
          error={consts.errors.messages.transaction.date[_.get(this.props.errors, 'date')]}
          selectedDate={this.state.date}
          updateStateFn={(date) => this.setState({date})}
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
        {!_.isEmpty(this.props.data) && <TouchableContent
          onPressFn={this.props.removeFn}
          content={
            <View style={styles.deleteButtonContainer}>
              {isSubmiting
                ? <ActivityIndicator size={13} color={styleVars.color.white} />
                : <Text style={styles.buttonStyle}>Remove</Text>}
            </View>
          }
        />}
      </View>
    )
  }
}

TransactionForm.propTypes = {
  errors: PropTypes.object,
  data: PropTypes.object,
  btnText: PropTypes.string,
  formTitle: PropTypes.string,
  isSubmiting: PropTypes.bool,
  submitFn: PropTypes.func.isRequired
}

export default TransactionForm
