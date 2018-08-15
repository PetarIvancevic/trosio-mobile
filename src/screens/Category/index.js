import React, {Component} from 'react'
import {ActivityIndicator, Button, FlatList, Text, TouchableOpacity, View} from 'react-native'

import fetch from '../../utils/fetch'
import styles from './styles'
import styleVars from '../../styles/variables'

import LoadingScreen from '../LoadingScreen'
import TouchableContent from '../../components/TouchableContent'

class CategoryHome extends Component<Props> {
  constructor () {
    super()

    this.mainNavigator = this.mainNavigator.bind(this)
    this.renderItemFn = this.renderItemFn.bind(this)
    this.state = {categories: [], fetching: true}
  }

  async componentDidMount () {
    const {data: categories} = await fetch.get('category')
    await this.setState({
      categories: categories || [],
      fetching: false
    })
  }

  mainNavigator (route, params = {}) {
    const {navigation} = this.props

    console.log('params', params)
    return function () {
      return navigation.navigate(route, params)
    }
  }

  renderItemFn (listItem) {
    const category = listItem.item
    return (
      <TouchableOpacity
        key={`listedCategory${category.id}`}
        onPress={this.mainNavigator('CategoryShow', {categoryId: category.id})}>
        <View style={styles.categoryListItemContainer}>
          <Text style={styles.categoryListItem}>
            {category.name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  headerComponent () {
    return (
      <View>
        <Text style={styles.header}>Category Name</Text>
      </View>
    )
  }

  emptyCategoryList () {
    return (
      <View key='listedCategory0'>
        <Text>There are no categories</Text>
      </View>
    )
  }

  render () {
    if (this.state.fetching) {
      return <LoadingScreen />
    }

    return (
      <View style={styles.body}>
        <TouchableContent
          onPressFn={this.mainNavigator('CategoryParentForm')}
          content={
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonStyle}>Add Category</Text>
            </View>}
        />
        <FlatList
          data={this.state.categories}
          renderItem={this.renderItemFn}
          ListEmptyComponent={this.emptyCategoryList}
          ListHeaderComponent={this.headerComponent}
        />
      </View>
    )
  }
}

export default CategoryHome
