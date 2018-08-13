import React from 'react'
import {TouchableOpacity} from 'react-native'

function TouchableContent ({content, onPressFn}) {
  return (
    <TouchableOpacity onPress={onPressFn}>
      {content}
    </TouchableOpacity>
  )
}

export default TouchableContent
