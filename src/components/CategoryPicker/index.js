import _ from 'lodash'
import React, {Component} from 'react'
import {
  Picker,
  Text,
  View,
} from 'react-native'

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
  return (
    <View>
      <Text>Category:</Text>
      <Picker
        selectedValue={selectedCategory}
        style={{height: 50, width: 100}}
        onValueChange={updateStateFn}>
        {getPickerItems(categories)}
      </Picker>
    </View>
  )
}

export default CategoryPicker
