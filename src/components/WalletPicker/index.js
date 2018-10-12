import _ from 'lodash'
import React, {Component} from 'react'
import {
  Picker,
  Text,
  View,
} from 'react-native'

import styles from './styles'

function getPickerItems (wallets) {
  return _.map(wallets, function (wallet, index) {
    return (
      <Picker.Item
        key={`wallet${index}`}
        label={wallet.name}
        value={wallet.id}
      />
    )
  })
}

function WalletPicker ({enabled, updateStateFn, selectedWallet, wallets}) {
  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.header}>Wallet:</Text>
      <Picker
        enabled={enabled}
        onValueChange={updateStateFn}
        prompt='Select Wallet'
        selectedValue={selectedWallet}>
        {getPickerItems(wallets)}
      </Picker>
    </View>
  )
}

export default WalletPicker
