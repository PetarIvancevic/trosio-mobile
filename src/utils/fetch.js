import 'whatwg-fetch'
import _ from 'lodash'
import consts from '../consts'
import {API_URL} from 'react-native-dotenv'
import {AsyncStorage} from 'react-native'

function respJSON (response) {
  return response.json()
}

async function fetchFn ({body, url, method}) {
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

export default fetchFn
