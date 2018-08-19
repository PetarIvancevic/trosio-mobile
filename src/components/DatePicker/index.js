import _ from 'lodash'
import React, {Component} from 'react'
import {
  DatePickerAndroid,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'
import utils from '../../utils/generic'
import TouchableContent from '../TouchableContent'

function onPressFn (updateStateFn, selectedDate) {
  return async function () {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date(selectedDate)
      })

      if (action !== DatePickerAndroid.dismissedAction) {
        await updateStateFn(new Date(year, month, day).toISOString())
      }

    } catch ({code, message}) {
      console.warn('Cannot open date picker', message)
    }
  }
}

function formatDate (selectedDate) {
  if (!selectedDate) return
  return utils.formatDate(selectedDate)
}

function DatePicker (props) {
  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.header}>
        Date of transaction:
      </Text>
      <TouchableContent
        content={
          <View style={props.selectedDate ? styles.dateStyle : styles.noDateStyle}>
            <Text>{formatDate(props.selectedDate) || 'Click to enter date'}</Text>
          </View>
        }
        onPressFn={onPressFn(props.updateStateFn, props.selectedDate)}
      />
      <Text style={styles.errorText}>{props.error}</Text>
    </View>
  )
}

DatePicker.propTypes = {
  error: PropTypes.object,
  selectedDate: PropTypes.string,
  updateStateFn: PropTypes.func.isRequired
}

export default DatePicker
