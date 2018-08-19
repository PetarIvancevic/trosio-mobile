import {StyleSheet} from 'react-native'

import styleVars from '../../styles/variables'

const styles = StyleSheet.create({
  header: {
    fontWeight: '700'
  },
  pickerContainer: {
    width: '95%'
  },
  errorMessage: {
    color: styleVars.color.error,
    fontWeight: '700'
  }
})


export default styles
