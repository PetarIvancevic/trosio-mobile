import React, {Component} from 'react'
import {Button, Text, View} from 'react-native'

class ErrorPage extends Component<Props> {
  constructor () {
    super()

    this.redirectToLogin = this.redirectToLogin.bind(this)
  }

  redirectToLogin () {
    const {navigation} = this.props

    return function () {
      navigation.navigate('Login')
    }
  }

  render () {
    return (
      <View>
        <Text>There was an error!</Text>
        <Button
          onPress={this.redirectToLogin()}
          color="#841584"
          title={'Back to Login'}
        />
      </View>
    )
  }
}

export default ErrorPage
