'use strict'

const AppError = require('../../Error/AppError')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const Game = use('App/Models/Game')
const Type = use('App/Models/Type')
/**
 * Resourceful controller for interacting with games
 */
class GameController {
  /**
   * Show a list of all games.
   * GET games
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const { user_id } = request.get()
    if (user_id) {
      const games = await Game.query().where({ user_id }).with('user').with('type').fetch()
      return games
    }
    const games = await Game.query().with('user').with('type').fetch()
    return games
  }

  /**
   * Create/save a new game.
   * POST games
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const data = request.only(['type_id', 'numbers'])

    const type = await Type.find(data.type_id)
    if (!type) {
      throw new AppError('Type does not exist', 404)
    }
    data.user_id = auth.user.id
    data.price = type.price

    const game = await Game.create(data)
    return game
  }

  /**
   * Display a single game.
   * GET games/:id
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
    const game = await Game.findBy('id', params.id)
    if (!game) {
      throw new AppError('Game not found', 404)
    }
    await game.load('user')
    await game.load('type')

    return game
  }

  /**
   * Update game details.
   * PUT or PATCH games/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    if (isNaN(Number(params.id))) {
      throw new AppError('id should be a number')
    }

    const data = request.only(['type_id', 'numbers'])
    const game = await Game.findBy('id', params.id)
    if (!game) {
      throw new AppError('Game not found', 404)
    }
    if (data.type_id) {
      const type = await Type.find(data.type_id)
      if (!type) {
        throw new AppError('Type does not exist', 404)
      }

      data.price = type.price
    }

    await game.merge(data)
    await game.save()
    return game
  }

  /**
   * Delete a game with id.
   * DELETE games/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response, auth }) {
    if (isNaN(Number(params.id))) {
      throw new AppError('id should be a number')
    }

    const game = await Game.findBy('id', params.id)

    if (!game || game.user_id !== auth.user.id) {
      throw new AppError('Game not found', 404)
    }

    await game.delete()
    return response.status(200).json({ deleted: true })
  }
}

module.exports = GameController
