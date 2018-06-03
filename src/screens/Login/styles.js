import {StyleSheet} from 'react-native'

import styleVars from '../../styles/variables'

const styles = StyleSheet.create({
  loginContainer: {
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
  spinnerContainer: {
    alignItems: 'center',
    backgroundColor: styleVars.color.appBg,
    flex: 1,
    flexDirection: 'column',
    paddingTop: '70%'
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

export default styles
