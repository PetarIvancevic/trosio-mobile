import _ from 'lodash'
import React, {Component} from 'react'
import {
  Picker,
  Text,
  View
} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

function renderHelper () {
  const paydays = []
  const FINAL_PAYDAY = 15

  for (let i = 0; i < FINAL_PAYDAY; i++) {
    paydays.push(<Picker.Item
      key={`paydayItem${i + 1}`}
      label={(i + 1).toString()}
      value={(i + 1).toString()}
    />)
  }

  return paydays
}

function PayDay (props) {
  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.header}>
        Wallet payday:
      </Text>
      <Picker
        enabled={props.enabled}
        style={styles.picker}
        selectedValue={props.selectedPayCheckDay}
        style={props.style}
        onValueChange={props.updateStateFn}>
        {renderHelper()}
      </Picker>
      {props.error && <Text style={styles.errorMessage}>{props.error}</Text>}
    </View>
  )
}

PayDay.propTypes = {
  error: PropTypes.object,
  selectedPayCheckDay: PropTypes.string,
  style: PropTypes.object,
  updateStateFn: PropTypes.func.isRequired,
}

export default PayDay
