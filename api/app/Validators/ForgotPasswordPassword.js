'use strict'

const Antl = use('Antl')

class ForgotPasswordPassword {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      password: 'required|confirmed'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ForgotPasswordPassword
