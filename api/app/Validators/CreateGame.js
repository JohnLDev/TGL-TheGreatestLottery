'use strict'

const Antl = use('Antl')

class CreateGame {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      numbers: 'required|string',
      type_id: 'required|number'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = CreateGame
