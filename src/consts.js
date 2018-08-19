const msgs = {
  login: {
    accountRequired: 'You need to have an account to use the application'
  }
}

const genericErrorMsgs = {
  duplicate: function (model) {
    return `You already have a ${model} with that name`
  }
}

const errors = {
  messages: {
    'any.default': 'There was an error',
    category: {
      duplicate: genericErrorMsgs.duplicate('category'),
      name: {
        'string.max': 'Name to large',
        'string.min': 'Name must be at least two characters long'
      }
    },
    wallet: {
      duplicate: genericErrorMsgs.duplicate('wallet'),
      name: {
        'any.empty': 'Name is required',
        'string.max': 'Name to large',
        'string.min': 'Name must be at least two characters long'
      },
      balance: {

      },
      paycheckAmount: {

      }
    }
  },
  validation: {

  },
}

const consts = {
  msgs,
  errors,
}

export default consts
