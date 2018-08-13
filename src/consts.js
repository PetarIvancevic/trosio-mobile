const msgs = {
  login: {
    accountRequired: 'You need to have an account to use the application'
  }
}

const errors = {
  messages: {
    'any.default': 'There was an error',
    category: {
      duplicate: 'Category name already taken',
      name: {
        'string.max': 'Name to large',
        'string.min': 'Name must be at least two characters long'
      }
    }
  },
  validation: {

  }
}

const consts = {
  msgs,
  errors,
}

export default consts
