import React from 'react'
import PropTypes from 'prop-types'
import {Text, TextInput, View} from 'react-native'

import styles from './styles'

function TextInputComponent (props) {
  return (
    <View style={styles.body}>
      <Text style={styles.header}>
        {props.inputName}:
      </Text>
      <TextInput
        keyboardType={props.keyboardType}
        onChangeText={props.updateStateFn}
        placeholder={props.placeholder || props.inputName}
        value={props.value}
      />
      <Text style={styles.errorMessage}>{props.errorMsg}</Text>
    </View>
  )
}

TextInputComponent.propTypes = {
  errorMsg: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  inputName: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  updateStateFn: PropTypes.func.isRequired,
  value: PropTypes.string
}

export default TextInputComponent
