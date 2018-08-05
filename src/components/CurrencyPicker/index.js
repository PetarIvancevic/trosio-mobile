import React, {Component} from 'react'
import {
  Picker,
  Text,
  View,
} from 'react-native'

class CurrencyPicker extends Component<Props> {
  render () {
    return (
      <View>
        <Text>
          Currency:
        </Text>
        <Picker
          selectedValue={this.props.selectedCurrency}
          style={{height: 50, width: 100}}
          onValueChange={this.props.updateStateFn}>
          <Picker.Item label="Euro" value="10" />
          <Picker.Item label="Kuna" value="20" />
          <Picker.Item label="Dollar" value="30" />
        </Picker>
      </View>
    )
  }
}

export default CurrencyPicker
