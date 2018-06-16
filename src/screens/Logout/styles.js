import {StyleSheet} from 'react-native'

import styleVars from '../../styles/variables'

const styles = StyleSheet.create({
  spinnerContainer: {
    alignItems: 'center',
    backgroundColor: styleVars.color.appBg,
    flex: 1,
    flexDirection: 'column',
    paddingTop: '70%'
  },
})

export default styles
