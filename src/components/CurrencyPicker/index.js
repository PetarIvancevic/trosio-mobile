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
          <Picker.Item key='01' label="Euro" value="10" />
          <Picker.Item key='02' label="Kuna" value="20" />
          <Picker.Item key='03' label="Dollar" value="30" />
        </Picker>
      </View>
    )
  }
}

export default CurrencyPicker
