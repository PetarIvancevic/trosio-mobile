import React from 'react'
import {Text, View} from 'react-native'

function navigationOptions ({title}) {
  const screenTitle = title || 'Trosio'

  return (
    <View>
      <Text>{screenTitle}</Text>
    </View>
  )
}

export default navigationOptions
