import React, {Component} from 'react'
import {
  Button,
  Picker,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import PayDayComponent from '../../../components/PayDay'

// import styles from './styles'

class WalletCreate extends Component<Props> {
  constructor (props) {
    super(props)

    this.updatePayDay = this.updatePayDay.bind(this)

    this.state = {
      walletCurrency: '',
      walletInitialAmount: '0',
      walletName: '',
      walletPayAmount: '0',
      walletPayDay: '1',
    }
  }

  updatePayDay (day, index) {
    this.setState({walletPayDay: day})
  }

  submit () {

  }

  render () {
    return (
      <View>
        <View>
          <Text>
            Create Wallet
          </Text>
        </View>

        <View>
          <Text>
            Name:
          </Text>
          <TextInput
            style={{height: 40}}
            placeholder="Name..."
            onChangeText={(walletName) => this.setState({walletName})}
          />
        </View>

        <View>
          <Text>
            Currency:
          </Text>
          <Picker
            selectedValue={this.state.walletCurrency}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.setState({walletCurrency: itemValue})}>
            <Picker.Item label="Euro" value="DOL" />
            <Picker.Item label="Dollar" value="EUR" />
            <Picker.Item label="Kuna" value="KN" />
          </Picker>
        </View>

        <View>
          <Text>
            Initial wallet amount:
          </Text>
          <TextInput
            keyboardType='numeric'
            onChangeText={(walletInitialAmount)=> this.setState({walletInitialAmount})}
            value={this.state.myNumber}
          />
        </View>

        <PayDayComponent
          updateStateFn={this.updatePayDay}
          walletPayDay={this.state.walletPayDay}
        />

        <View>
          <Text>
            Pay amount:
          </Text>
          <TextInput
            keyboardType='numeric'
            onChangeText={(walletPayAmount)=> this.setState({walletPayAmount})}
            value={this.state.myNumber}
          />
        </View>

        <View>
          <Button
            onPress={this.submit}
            color="#841584"
            title={'Create Wallet'}
          />
        </View>
      </View>
    )
  }
}

export default WalletCreate
