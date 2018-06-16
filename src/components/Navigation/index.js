import React, {Component} from 'react'
import {
  AsyncStorage,
  Text,
  Image,
  TouchableOpacity,
  View
} from 'react-native'

import styles from './styles'

class NavigationComponent extends Component<Props> {
  constructor (props) {
    super(props)

    this.openDrawer = this.openDrawer.bind(this)

    this.state = {user: {}}
  }

  async componentWillMount () {
    const user = JSON.parse(await AsyncStorage.getItem('user')) || {}
    await this.setState({user})
  }

  openDrawer () {
    this.props.navigation.push('Drawer')
  }

  render () {
    const {user} = this.state
    const placeHolderIcon = require('../../../assets/images/user-icon-placeholder.png')

    const imageObj = user.photo ? {uri: user.photo} : placeHolderIcon

    return (
      <View style={styles.header}>
        <Text style={styles.name}>{user.name}</Text>
        <TouchableOpacity onPress={this.openDrawer}>
          <Image
            style={styles.image}
            source={imageObj}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

export default NavigationComponent
