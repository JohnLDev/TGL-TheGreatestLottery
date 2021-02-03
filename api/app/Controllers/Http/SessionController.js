'use strict'

const AppError = require('../../Error/AppError')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
class SessionController {
  /**
   * Show a list of all games.
   * GET games
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async store ({ request, response, auth }) {
    const { email, password } = request.all()
    const user = await User.findBy('email', email)
    if (user && !user.is_confirmed) {
      throw new AppError('Please verify your email address')
    }
    try {
      const token = await auth.attempt(email, password)

      return { user, token }
    } catch (error) {
      return response.status(error.status).json({ error: { message: 'Invalid email/password' } })
    }
  }

  async confirmEmail ({ params, response }) {
    if (isNaN(Number(params.id))) {
      throw new AppError('id should be a number')
    }
    const user = await User.find(params.id)
    if (!user) {
      throw new AppError('User not found', 404)
    }
    if (user.is_confirmed) {
      throw new AppError('User already confirmed')
    }
    user.is_confirmed = true
    await user.save()
    return response.status(200).json({ email: 'confirmed' })
  }
}

module.exports = SessionController
