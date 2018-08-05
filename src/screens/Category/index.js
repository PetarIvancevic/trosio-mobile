import React, {Component} from 'react'
import {Button, FlatList, Text, TouchableOpacity, View} from 'react-native'

import fetch from '../../utils/fetch'
import styles from './styles'

class CategoryHome extends Component<Props> {
  constructor () {
    super()

    this.mainNavigator = this.mainNavigator.bind(this)
    this.renderItemFn = this.renderItemFn.bind(this)
    this.state = {categories: []}
  }

  async componentDidMount () {
    const {data: categories} = await fetch({
      url: 'category',
      method: 'GET',
    })
    this.setState({categories})
  }

  mainNavigator (route, params = {}) {
    const {navigation} = this.props

    return function () {
      navigation.navigate(route, params)
    }
  }

  renderItemFn (listItem) {
    const category = listItem.item
    return (
      <TouchableOpacity onPress={this.mainNavigator('CategoryParentForm', {categoryId: category.id})}>
        <View>
          <Text style={{
            fontSize: 20,
            lineHeight: 30
          }}>
            {category.name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    console.log(this.state.categories)
    return (
      <View style={styles.body}>
        <Button
          onPress={this.mainNavigator('CategoryParentForm')}
          color="#841584"
          title={'Create Category'}
        />
        {this.state.categories.length === 0 ?
          <Text style={{fontSize: 20}}>Loading...</Text> :
          <FlatList
            data={this.state.categories}
            renderItem={this.renderItemFn}
          />
        }
      </View>
    )
  }
}

export default CategoryHome
