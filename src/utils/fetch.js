import 'whatwg-fetch'

function respJSON (response) {
  return response.json()
}

function fetchFn ({body, url, method}) {
  return fetch(`https://f035a3fa.ngrok.io/${url}`, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    method,
  })
  .then(respJSON)
}

export default fetchFn
