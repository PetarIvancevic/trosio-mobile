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
import PropTypes from 'prop-types'

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
      name: props.data.name
    }
  }

  submit () {
    this.props.submitFn(this.state)
  }

  render () {
    const {isSubmiting} = this.props

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

CategoryForm.propTypes = {
  error: PropTypes.object,
  data: PropTypes.object,
  btnText: PropTypes.string,
  formTitle: PropTypes.string,
  isSubmiting: PropTypes.bool,
  submitFn: PropTypes.func.isRequired
}

export default CategoryForm
