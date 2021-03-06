import _ from 'lodash'
import React, {Component} from 'react'
import {
  Button,
  Picker,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import CategoryForm from '../../../forms/Category'
import errUtils from '../../../utils/error'
import fetch from '../../../utils/fetch'
import LoadingScreen from '../../LoadingScreen'

class CategoryParentForm extends Component<Props> {
  constructor (props) {
    super(props)

    this.submit = this.submit.bind(this)

    this.state = {
      data: {},
      errors: {},
      fetching: true,
      isSubmiting: false
    }
  }

  async componentDidMount () {
    const {navigation} = this.props
    const categoryId = navigation.getParam('categoryId')
    let categoryData = {}

    if (categoryId) {
      categoryData = _.get(await fetch.get(`category/${categoryId}`), 'data')
    }
    await this.setState({
      data: categoryData,
      fetching: false
    })
  }

  async submit (data) {
    const {navigation} = this.props

    if (this.state.isSubmiting) return

    await this.setState({isSubmiting: true})

    const categoryId = navigation.getParam('categoryId')

    const requestData = categoryId ? {
      method: 'put',
      url: `category/${categoryId}`,
    } : {
      method: 'post',
      url: 'category',
    }

    try {
      const response = await fetch[requestData.method](requestData.url, {name: data.name})

      if (!_.get(response, 'error')) {
        return this.props.navigation.navigate('Categories')
      }
      await this.setState({errors: errUtils.parseErrors(response)})
    } catch (err) {
      console.error(err)
    }
    await this.setState({isSubmiting: false})
  }

  componentWillUnmount () {
    const {navigation} = this.props

    navigation.setParams({categoryId: null})
  }

  render () {
    const {navigation} = this.props
    const categoryId = navigation.getParam('categoryId')

    if (this.state.fetching) {
      return <LoadingScreen />
    }

    return (
      <ScrollView>
        <CategoryForm
          errors={this.state.errors}
          data={this.state.data}
          btnText={categoryId ? 'Update' : 'Create'}
          formTitle={`${categoryId ? 'Update' : 'Create'} Category`}
          isSubmiting={this.state.isSubmiting}
          submitFn={this.submit}
        />
      </ScrollView>
    )
  }
}

export default CategoryParentForm
