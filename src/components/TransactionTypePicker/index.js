import React, {Component} from 'react'
import {
  Picker,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

function TransactionTypePicker (props) {
  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.header}>
        Type:
      </Text>
      <Picker
        selectedValue={props.selectedType}
        prompt='Select type of transaction'
        onValueChange={props.updateStateFn}>
        <Picker.Item key='01' label='Withdrawal' value='withdrawal' />
        <Picker.Item key='02' label='Deposit' value='deposit' />
      </Picker>
    </View>
  )
}

TransactionTypePicker.propTypes = {
  error: PropTypes.object,
  selectedType: PropTypes.string,
  updateStateFn: PropTypes.func.isRequired
}

export default TransactionTypePicker
