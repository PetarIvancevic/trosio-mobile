import _ from 'lodash'

import consts from '../consts'

function parseValidationErrors (errors) {
  return _.reduce(errors, function (result, value) {
    result[value.path] = value.type
    return result
  }, {})
}

function parseErrors (response) {
  const respErrors = _.get(response, 'errorv')
  let errors = {}

  if (response.error === 'http.bad_request') {
    errors = parseValidationErrors(respErrors.body)
  } else {
    errors = response.error || 'any.default'
  }

  return errors
}

export default {
  parseErrors
}
