import React, {Component} from 'react'
import {Button, Text, View} from 'react-native'

import fetch from '../../../utils/fetch'
import ModalComponent from '../../../components/Modal'
import styles from './styles'

class CategoryShow extends Component<Props> {
  constructor (props) {
    super(props)

    this.mainNavigator = this.mainNavigator.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.deleteModal = this.deleteModal.bind(this)
    this.state = {category: {}, isModalOpen: false}
  }

  async componentDidMount () {
    const {navigation} = this.props
    const categoryId = navigation.getParam('categoryId')
    const {data: category} = await fetch.get(`category/${categoryId}`)
    this.setState({category})
  }

  mainNavigator (route, params = {}) {
    const {navigation} = this.props

    return function () {
      navigation.navigate(route, params)
    }
  }

  async deleteModal () {
    const {navigation} = this.props
    const categoryId = navigation.getParam('categoryId')

    const {data} = await fetch.delete(`category/${categoryId}`)
    return navigation.navigate('Categories')
  }

  toggleModal () {
    return this.setState({isModalOpen: !this.state.isModalOpen})
  }

  render () {
    const {navigation} = this.props
    const categoryId = navigation.getParam('categoryId')
    const {category} = this.state

    return (
      <View style={styles.body}>
        <Text>{category.name || 'Loading...'}</Text>
        <Button
          onPress={this.mainNavigator('CategoryParentForm', {categoryId})}
          color="#841584"
          title={'Edit'}
        />
        <Button
          onPress={this.toggleModal}
          color="#841584"
          title={'Delete'}
        />
        {this.state.isModalOpen && <ModalComponent
          message={`Are you sure you want to delete "${category.name}" category`}
          confirmFn={this.deleteModal}
          closeModalFn={this.toggleModal}
        />}
      </View>
    )
  }
}

export default CategoryShow
