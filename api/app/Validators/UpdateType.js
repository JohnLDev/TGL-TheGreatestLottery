'use strict'
const Antl = use('Antl')

class UpdateType {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      type: 'string|unique:types',
      description: 'string|required',
      range: 'number|range:1,80',
      price: 'number|above:0',
      'max-number': 'number|range:1,80',
      color: 'string|max:7|min:7|regex:^#([a-fA-F0-9]{6})$',
      'min-cart-value': 'number|required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = UpdateType
