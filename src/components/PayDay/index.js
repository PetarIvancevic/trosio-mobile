import _ from 'lodash'
import React, {Component} from 'react'
import {
  Picker,
  Text,
  View
} from 'react-native'

class PayDay extends Component<Props> {
  renderPaydays () {
    const paydays = []
    const FINAL_PAYDAY = 15

    for (let i = 0; i < FINAL_PAYDAY; i++) {
      paydays.push(<Picker.Item
        key={`paydayItem${i + 1}`}
        label={(i + 1).toString()}
        value={(i + 1).toString()}
      />)
    }

    return paydays
  }

  render () {
    return (
      <View>
        <Text>
          Wallet payday:
        </Text>
        <Picker
          selectedValue={this.props.walletPayDay}
          style={this.props.style}
          onValueChange={this.props.updateStateFn}>
          {this.renderPaydays()}
        </Picker>
      </View>
    )
  }
}

export default PayDay
