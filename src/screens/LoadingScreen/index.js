import React from 'react'
import {ActivityIndicator, View} from 'react-native'

import styles from './styles'
import styleVars from '../../styles/variables'

function LoadingScreen () {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size={80} color={styleVars.color.white} />
    </View>
  )
}

export default LoadingScreen
