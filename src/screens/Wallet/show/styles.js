import {StyleSheet} from 'react-native'

import styleVars from '../../../styles/variables'

const styles = StyleSheet.create({
  body: {
    padding: 10
  },
  buttonContainer: {
    backgroundColor: styleVars.color.appBg,
    borderRadius: 10,
    marginTop: '1%',
    padding: '5%'
  },
  buttonStyle: {
    color: styleVars.color.white,
    textAlign: 'center',
    fontSize: 20
  },
  walletName: {
    fontSize: 25,
    textAlign: 'center'
  }
})

export default styles
