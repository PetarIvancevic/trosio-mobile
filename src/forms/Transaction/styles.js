import {StyleSheet} from 'react-native'

import genericStyles from '../../styles/generic'
import styleVars from '../../styles/variables'

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column'
  },
  errorText: genericStyles.error,
  formHeading: {
    fontSize: styleVars.size.font.header,
    paddingBottom: '10%'
  },
  buttonContainer: {
    backgroundColor: styleVars.color.appBg,
    borderRadius: 7,
    marginTop: '10%',
    padding: '5%'
  },
  buttonStyle: {
    color: styleVars.color.white,
    textAlign: 'center'
  },
  spinnerContainer: genericStyles.spinnerContainer
})

export default styles
