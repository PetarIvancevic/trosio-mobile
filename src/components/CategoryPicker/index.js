import _ from 'lodash'
import React, {Component} from 'react'
import {
  Picker,
  Text,
  View,
} from 'react-native'

import styles from './styles'

function getPickerItems (categories) {
  return _.map(categories, function (category, index) {
    return (
      <Picker.Item
        key={`category${index}`}
        label={category.name}
        value={category.id}
      />
    )
  })
}

function CategoryPicker ({categories, updateStateFn, selectedCategory}) {
  if (!_.size(categories)) {
    return (
      <View>
        <Text>You have no categories to apply to this transaction</Text>
      </View>
    )
  }

  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.header}>Category:</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={updateStateFn}>
        {getPickerItems(categories)}
      </Picker>
    </View>
  )
}

export default CategoryPicker
