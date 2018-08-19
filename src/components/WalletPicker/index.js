import _ from 'lodash'
import React, {Component} from 'react'
import {
  Picker,
  Text,
  View,
} from 'react-native'

import styles from './styles'

function getPickerItems (wallets) {
  return _.map(wallets, function (category, index) {
    return (
      <Picker.Item
        key={`category${index}`}
        label={category.name}
        value={category.id}
      />
    )
  })
}

function WalletPicker ({updateStateFn, selectedWallet, wallets}) {
  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.header}>Wallet:</Text>
      <Picker
        selectedValue={selectedWallet}
        onValueChange={updateStateFn}>
        {getPickerItems(wallets)}
      </Picker>
    </View>
  )
}

export default WalletPicker
