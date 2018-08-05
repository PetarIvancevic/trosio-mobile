import _ from 'lodash'
import React, {Component} from 'react'
import {
  ActivityIndicator,
  Button,
  Picker,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import styles from './styles'
import styleVars from '../../styles/variables'

class CategoryForm extends Component<Props> {
  constructor (props) {
    super(props)

    this.submit = this.submit.bind(this)
    this.state = {
      name: '',
    }
  }

  submit () {
    this.props.submitFn(this.state)
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEmpty(nextProps.data) && !this.state.name) {
      this.setState({name: nextProps.data.name})
    }
  }

  render () {
    if (this.props.isSubmiting) {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size={80} color={styleVars.color.white} />
        </View>
      )
    }
    console.log('evo mi state', this.state)

    return (
      <View>
        <View>
          <Text>
            {this.props.formTitle}
          </Text>
        </View>

        <View>
          <Text>
            Name:
          </Text>
          <TextInput
            style={{height: 40}}
            placeholder='Name...'
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
          />
        </View>

        <View>
          <Button
            onPress={this.submit}
            color="#841584"
            title={this.props.btnText}
          />
        </View>
      </View>
    )
  }
}

export default CategoryForm
