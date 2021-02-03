'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const User = use('App/Models/User')
const AppError = require('../../Error/AppError')
const SendConfirmationEmailService = require('../../services/SendConfirmationEmailService')
class UserController {
  /**
   * Show a list of all games.
   * GET games
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async store ({ request, response }) {
    const data = request.only(['name', 'email', 'password'])
    try {
      const user = await User.create(data)
      SendConfirmationEmailService.execute(user)
      return user
    } catch (error) {
      console.log(error)
      return response.status(error.status).json({ error: { message: error.message } })
    }
  }

  async index () {
    const users = await User.query().paginate()
    return users
  }

  async show ({ response, params }) {
    if (isNaN(Number(params.id))) {
      throw new AppError('id should be a number')
    }
    const user = await User.find(params.id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    return user
  }

  async update ({ request, response, params, auth }) {
    if (isNaN(Number(params.id))) {
      throw new AppError('id should be a number')
    }
    if (auth.user.id !== Number(params.id)) {
      console.log(auth.user.id)
      throw new AppError('You can only update yourself')
    }
    const data = request.only(['name', 'email', 'password'])
    const user = await User.find(params.id)

    if (!user) {
      throw new AppError('User not found', 404)
    }
    if (data.email !== user.email) {
      user.is_confirmed = false
      user.email = data.email
      SendConfirmationEmailService.execute(user)
    }
    if (!data.password) {
      delete data.password
    }
    user.merge(data)

    await user.save()
    return user
  }

  async delete ({ request, response, params, auth }) {
    if (isNaN(Number(params.id))) {
      throw new AppError('id should be a number')
    }
    if (auth.user.id !== Number(params.id)) {
      throw new AppError('You can only delete yourself')
    }
    const user = await User.find(params.id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    await user.delete()
    return response.status(200).json({ deleted: true })
  }
}

module.exports = UserController
