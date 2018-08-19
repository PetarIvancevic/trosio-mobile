import _ from 'lodash'

function padLeftDate (str) {
  return _.padStart(str, 2, 0)
}

function formatDate (dateStr) {
  const formattedDate = new Date(dateStr)
  return `${formattedDate.getFullYear()}-${padLeftDate(formattedDate.getMonth() + 1)}-${padLeftDate(formattedDate.getDate())}`
}

export default {
  formatDate
}
