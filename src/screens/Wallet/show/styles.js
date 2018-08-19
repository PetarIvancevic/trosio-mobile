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
  fullRowText: {
    display: 'flex',
    color: styleVars.color.white
  },
  transactionListItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: styleVars.color.appBg,
    borderBottomWidth: 1,
    borderBottomColor: styleVars.color.white,
    borderRadius: 3,
    padding: '2%'
  },
  transactionListItemPlace: {
    color: styleVars.color.white,
    fontSize: 12,
    lineHeight: 25,
    flex: 0.5
  },
  transactionListItemAmount: {
    color: styleVars.color.white,
    fontSize: 12,
    lineHeight: 25,
    flex: 0.25
  },
  transactionListItemDate: {
    color: styleVars.color.white,
    fontSize: 12,
    lineHeight: 25,
    flex: 0.25
  },
  walletName: {
    fontSize: 25,
    textAlign: 'center'
  }
})

export default styles
