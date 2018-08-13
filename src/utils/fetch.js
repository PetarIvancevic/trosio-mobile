import 'whatwg-fetch'
import _ from 'lodash'
import consts from '../consts'
import {API_URL} from 'react-native-dotenv'
import {AsyncStorage} from 'react-native'

function respJSON (response) {
  return response.json()
}

function fetchFn (method) {
  return async function (url, body) {
    console.log('EVO URL OD REQ:', `${API_URL}/${url}`)
    const token = _.get(JSON.parse(await AsyncStorage.getItem('user')), 'token')
    return fetch(`${API_URL}/${url}`, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      method,
    })
    .then(respJSON)
    .catch(console.error)
  }
}

export default {
  get: fetchFn('GET'),
  post: fetchFn('POST'),
  put: fetchFn('PUT'),
  remove: fetchFn('DELETE')
}
