import {StyleSheet} from 'react-native'

import styleVars from '../../styles/variables'
import genericStyles from '../../styles/generic'

const styles = StyleSheet.create({
  dateStyle: {
    marginLeft: 5,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
    width: '95%'
  },
  noDateStyle: {
    marginLeft: 5,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
    paddingTop: 20,
    width: '95%'
  },
  header: {
    fontWeight: '700'
  },
  pickerContainer: {
    width: '95%'
  },
  errorText: genericStyles.error
})


export default styles
