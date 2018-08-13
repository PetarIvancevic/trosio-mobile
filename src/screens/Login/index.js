import _ from 'lodash'
import React, {Component} from 'react'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin'
import {ActivityIndicator, AsyncStorage, Text, View} from 'react-native'
import {GOOGLE_CLIENT_ID} from 'react-native-dotenv'

import consts from '../../consts'
import fetch from '../../utils/fetch'
import styles from './styles'
import styleVars from '../../styles/variables'

export default class Login extends Component<Props> {
  constructor (props) {
    super(props)

    this.googleLogin = this.googleLogin.bind(this)
    this.state = {showSpinner: true}
  }

  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      header: null
    }
  }

  async checkGooglePlayServices () {
    try {
      await GoogleSignin.hasPlayServices({autoResolve: true})
    } catch (e) {
      console.error(e)
    }
  }

  async createUserIfDoesNotExist (body) {
    return fetch.post('user', body)
  }

  async googleLogin () {
    const {checkGooglePlayServices} = this
    const {navigation} = this.props

    await checkGooglePlayServices()
    await GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID,
      offlineAccess: false
    })
    let user = {}

    try {
      user = await GoogleSignin.signIn()
    } catch (e) {
      console.error(e)
    }

    try {
      user.token = _.get(
        await this.createUserIfDoesNotExist(_.pick(user, ['idToken'])),
        'data.token'
      )
    } catch (err) {
      console.error(err)
    }

    if (!user.token) {
      return navigation.navigate('ErrorPage')
    }

    await AsyncStorage.setItem('user', JSON.stringify(user))
    navigation.navigate('Home')
  }

  async componentWillMount () {
    const {navigation} = this.props
    const user = JSON.parse(await AsyncStorage.getItem('user'))

    if (user) {
      navigation.navigate('Home')
    }
  }

  async componentDidMount () {
    this.setState({showSpinner: !!JSON.parse(await AsyncStorage.getItem('user'))})
  }

  render() {
    const {googleLogin} = this
    const {showSpinner} = this.state

    if (showSpinner) {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size={80} color={styleVars.color.white} />
        </View>
      )
    }

    return (
      <View style={styles.loginContainer}>
        <Text style={styles.appName}>Trosio</Text>
        <Text style={styles.header}>Login</Text>
        <GoogleSigninButton
          style={styles.googleBanner}
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Light}
          onPress={googleLogin}
        />
        <Text style={styles.message}>{consts.msgs.login.accountRequired}</Text>
      </View>
    )
  }
}
