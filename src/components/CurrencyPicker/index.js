import React, {Component} from 'react'
import {
  Picker,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

function CurrencyPicker (props) {
  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.header}>
        Currency:
      </Text>
      <Picker
        selectedValue={props.selectedCurrency}
        onValueChange={props.updateStateFn}>
        <Picker.Item key='01' label='Euro' value='10' />
        <Picker.Item key='02' label='Kuna' value='20' />
        <Picker.Item key='03' label='Dollar' value='30' />
      </Picker>
    </View>
  )
}

CurrencyPicker.propTypes = {
  error: PropTypes.object,
  selectedCurrency: PropTypes.string,
  updateStateFn: PropTypes.func.isRequired
}

export default CurrencyPicker
