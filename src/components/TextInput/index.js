import React from 'react'
import {Text, TextInput, View} from 'react-native'

import styles from './styles'

function TextInputComponent ({errorMsg, inputName, placeholder, updateStateFn, value}) {
  return (
    <View style={styles.body}>
      <Text style={styles.header}>
        {inputName}:
      </Text>
      <TextInput
        onChangeText={updateStateFn}
        placeholder={placeholder || inputName}
        value={value}
      />
      <Text style={styles.errorMessage}>{errorMsg}</Text>
    </View>
  )
}

export default TextInputComponent
