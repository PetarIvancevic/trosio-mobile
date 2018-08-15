import {StyleSheet} from 'react-native'

import genericStyles from '../../styles/generic'
import styleVars from '../../styles/variables'

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
  header: {
    fontWeight: '700',
    padding: '2%'
  },
  categoryListItemContainer: {
    backgroundColor: styleVars.color.appBg,
    borderBottomWidth: 1,
    borderBottomColor: styleVars.color.white,
    borderRadius: 3,
    padding: '2%'
  },
  categoryListItem: {
    color: styleVars.color.white,
    fontSize: 20,
    lineHeight: 30
  },
  spinnerContainer: genericStyles.spinnerContainer
})

export default styles
