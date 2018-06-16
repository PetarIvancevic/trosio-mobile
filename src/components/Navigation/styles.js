import {StyleSheet} from 'react-native'

import styleVars from '../../styles/variables'

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: styleVars.color.appBg,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 70
  },
  name: {
    color: styleVars.color.white,
    display: 'flex',
    flex: 1,
    fontFamily: 'OpenSans-Light',
    padding: 10
  },
  image: {
    borderColor: styleVars.color.white,
    borderRadius: 100,
    borderWidth: 1,
    display: 'flex',
    height: 50,
    margin: 10,
    width: 50
  }
})

export default styles
