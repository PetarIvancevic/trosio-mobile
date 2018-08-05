import _ from 'lodash'
import React, {Component} from 'react'
import {
  Button,
  Picker,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

  import fetch from '../../../utils/fetch'
import CategoryForm from '../../../forms/Category'

class CategoryParentForm extends Component<Props> {
  constructor (props) {
    super(props)

    this.submit = this.submit.bind(this)

    this.state = {
      categoryId: null,
      data: {},
      isSubmiting: false
    }
  }

  async componentDidMount () {
    const {navigation} = this.props
    const categoryId = navigation.getParam('categoryId')

    await this.setState({categoryId})
    const {data: categoryData} = await fetch({
      url: `category/${categoryId}`,
      method: 'GET',
    })
    await this.setState({data: categoryData})
  }

  async submit (data) {
    const {categoryId} = this.state
    let error, response
    await this.setState({isSubmiting: true})

    try {
      response = await fetch({
        url: categoryId ? `category/${categoryId}` : 'category',
        body: {name: data.name},
        method: categoryId ? 'PUT' : 'POST',
      })

      if (!_.get(response, 'error')) {
        return this.props.navigation.navigate('CategoryHome')
      }
      error = _.get(response, 'data')
    } catch (err) {
      error = err
    }
    this.setState({isSubmiting: false})
  }

  render () {
    return (
      <CategoryForm
        data={this.state.data}
        btnText="Create"
        formTitle="Create Category"
        isSubmiting={this.state.isSubmiting}
        submitFn={this.submit}
      />
    )
  }
}

export default CategoryParentForm
