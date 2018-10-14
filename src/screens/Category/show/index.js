import React, {Component} from 'react'
import {Button, FlatList, Text, ScrollView, View} from 'react-native'

import fetch from '../../../utils/fetch'
import LoadingScreen from '../../LoadingScreen'
import ModalComponent from '../../../components/Modal'
import styles from './styles'
import TouchableContent from '../../../components/TouchableContent'

class CategoryShow extends Component<Props> {
  constructor (props) {
    super(props)

    this.mainNavigator = this.mainNavigator.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.deleteModal = this.deleteModal.bind(this)
    this.state = {
      category: {},
      transactions: [],
      isModalOpen: false,
      fetching: true
    }
  }

  async componentDidMount () {
    const {navigation} = this.props
    const categoryId = navigation.getParam('categoryId')
    const {data: category} = await fetch.get(`category/${categoryId}`)
    const {data: transactions} = await fetch.get(`category/${categoryId}/transactions`)
    await this.setState({
      category,
      transactions,
      fetching: false
    })
  }

  mainNavigator (route, params = {}) {
    const {navigation} = this.props

    return function () {
      return navigation.navigate(route, params)
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

  renderItemFn (listItem) {
    const transaction = listItem.item
    return (
      <View style={styles.categoryListItemContainer}>
        <Text style={styles.categoryListItem}>
          {transaction.place}
        </Text>
      </View>
    )
  }

  headerComponent () {
    return (
      <View>
        <Text style={styles.header}>Transactions with category</Text>
      </View>
    )
  }

  emptyCategoryList () {
    return (
      <View key='listedCategory0'>
        <Text>There are no transactions for this category</Text>
      </View>
    )
  }

  render () {
    const {navigation} = this.props
    const categoryId = navigation.getParam('categoryId')
    const {category} = this.state

    if (this.state.fetching) {
      return <LoadingScreen />
    }

    return (
      <ScrollView>
        <View style={styles.body}>
          <Text style={styles.categoryName}>{category.name}</Text>

          <TouchableContent
            onPressFn={this.mainNavigator('CategoryParentForm', {categoryId})}
            content={
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonStyle}>Edit</Text>
              </View>}
          />

          <TouchableContent
            onPressFn={this.toggleModal}
            content={
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonStyle}>Delete</Text>
              </View>}
          />

          <FlatList
            data={this.state.transactions}
            renderItem={this.renderItemFn}
            ListEmptyComponent={this.emptyCategoryList}
            ListHeaderComponent={this.headerComponent}
          />

          {this.state.isModalOpen && <ModalComponent
            message={`Are you sure you want to delete "${category.name}" category`}
            confirmFn={this.deleteModal}
            closeModalFn={this.toggleModal}
          />}
        </View>
      </ScrollView>
    )
  }
}

export default CategoryShow
