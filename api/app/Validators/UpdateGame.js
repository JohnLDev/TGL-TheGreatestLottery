'use strict'

const Antl = use('Antl')

class UpdateGame {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      numbers: 'string',
      type_id: 'number'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = UpdateGame
