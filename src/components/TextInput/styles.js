import {StyleSheet} from 'react-native'

import styleVars from '../../styles/variables'

const styles = StyleSheet.create({
  body: {
    width: '95%'
  },
  header: {
    fontWeight: '700'
  },
  errorMessage: {
    color: styleVars.color.error,
    fontWeight: '700'
  }
})


export default styles
