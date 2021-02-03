'use strict'

const Antl = use('Antl')

class CreateType {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      type: 'string|required|unique:types',
      description: 'string|required',
      range: 'number|required|range:1,80',
      price: 'number|required|above:0',
      'max-number': 'number|required|range:1,80',
      color: 'string|required|max:7|min:7|regex:^#([a-fA-F0-9]{6})$',
      'min-cart-value': 'number|required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = CreateType
