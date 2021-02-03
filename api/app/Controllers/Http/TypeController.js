'use strict'

const AppError = require('../../Error/AppError')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

/**
 * Resourceful controller for interacting with types
 */
const Type = use('App/Models/Type')

class TypeController {
  /**
   * Show a list of all types.
   * GET types
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const types = await Type.all()
    return types
  }

  /**
   * Create/save a new type.
   * POST types
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['type', 'description', 'range', 'price', 'max-number', 'color', 'min-cart-value'])
    const newType = await Type.create(data)
    return newType
  }

  /**
   * Display a single type.
   * GET types/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    if (isNaN(Number(params.id))) {
      throw new AppError('id should be a number')
    }
    const type = await Type.findBy('id', params.id)
    if (!type) {
      throw new AppError('Type not found', 404)
    }
    await type.load('games.user')
    return type
  }

  /**
   * Update type details.
   * PUT or PATCH types/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    if (isNaN(Number(params.id))) {
      throw new AppError('id should be a number')
    }
    const data = request.only(['type', 'description', 'range', 'price', 'max-number', 'color', 'min-cart-value'])

    const type = await Type.findBy('id', params.id)
    if (!type) {
      throw new AppError('Type not found', 404)
    }

    await type.merge(data)
    await type.save()
    return type
  }

  /**
   * Delete a type with id.
   * DELETE types/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    if (isNaN(Number(params.id))) {
      throw new AppError('id should be a number')
    }
    const type = await Type.findBy('id', params.id)
    if (!type) {
      throw new AppError('Type not found', 404)
    }
    await type.delete()
    return response.status(200).json({ deleted: true })
  }
}

module.exports = TypeController
