import React, { Component } from 'react'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'

import consts from './src/consts'
import styleVars from './src/styles/variables'

export default class App extends Component<Props> {
  constructor (props) {
    super(props)

    this.googleLogin = this.googleLogin.bind(this)
  }

  async checkGooglePlayServices () {
    try {
      await GoogleSignin.hasPlayServices({autoResolve: true})
    } catch (e) {
      console.error(e)
    }
  }

  async googleLogin () {
    const {checkGooglePlayServices} = this

    await checkGooglePlayServices()
    await GoogleSignin.configure({
      offlineAccess: true // if you want to access Google API on behalf of the user FROM YOUR SERVER
    })
    let user

    try {
      user = await GoogleSignin.signIn()
    } catch (e) {
      console.error(e)
    }

    console.log('evo user', user)
  }

  async componentDidMount () {
    const user = await GoogleSignin.currentUserAsync()


    console.log('evo user', user)
  }

  render() {
    const {googleLogin} = this

    return (
      <View style={styles.app}>
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

const styles = StyleSheet.create({
  app: {
    alignItems: 'center',
    backgroundColor: styleVars.color.appBg,
    flex: 1,
    flexDirection: 'column',
    padding: '10%',
    paddingTop: '30%'
  },
  appName: {
    color: styleVars.color.white,
    display: 'flex',
    fontFamily: styleVars.fontFamily.openSans.extraBold,
    fontSize: styleVars.size.font.appName,
    lineHeight: 35,
    textAlign: 'center'
  },
  header: {
    color: styleVars.color.white,
    display: 'flex',
    fontSize: styleVars.size.font.header,
    fontFamily: styleVars.fontFamily.openSans.regular,
    marginBottom: 10,
    textAlign: 'left'
  },
  googleBanner: {
    height: 75,
    width: '100%'
  },
  message: {
    color: styleVars.color.white,
    display: 'flex',
    fontSize: styleVars.size.font.normal,
    fontFamily: styleVars.fontFamily.openSans.light,
    textAlign: 'center'
  }
})
