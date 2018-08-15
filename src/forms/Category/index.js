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

import consts from '../../consts'
import styles from './styles'
import styleVars from '../../styles/variables'
import TextInputComponent from '../../components/TextInput'
import TouchableContent from '../../components/TouchableContent'

class CategoryForm extends Component<Props> {
  constructor (props) {
    super(props)

    this.submit = this.submit.bind(this)
    this.state = {
      loadedData: false,
      name: '',
    }
  }

  submit () {
    this.props.submitFn(this.state)
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEmpty(nextProps.data) && !this.state.name) {
      this.setState({name: nextProps.data.name, loadedData: true})
    }
  }

  render () {
    const {isSubmiting, isUpdate} = this.props
    const isLoadingData = isUpdate && !this.state.name && !this.state.loadedData

    if (isLoadingData) {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size={80} color={styleVars.color.white} />
        </View>
      )
    }

    return (
      <View style={styles.body}>
        <View>
          <Text style={styles.formHeading}>
            {this.props.formTitle}
          </Text>
        </View>

        <TextInputComponent
          errorMsg={consts.errors.messages.category.name[_.get(this.props.errors, 'name')]}
          inputName='Name'
          placeholder='Category name...'
          updateStateFn={(name) => this.setState({name})}
          value={this.state.name}
        />

        <View>
          <Text style={styles.errorText}>
            {_.get(consts.errors.messages, this.props.errors)}
          </Text>
        </View>

        <TouchableContent
          onPressFn={this.submit}
          content={
            <View style={styles.buttonContainer}>
              {isSubmiting
                ? <ActivityIndicator size={13} color={styleVars.color.white} />
                : <Text style={styles.buttonStyle}>{this.props.btnText}</Text>}
            </View>
          }
        />
      </View>
    )
  }
}

export default CategoryForm
