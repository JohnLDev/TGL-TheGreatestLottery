'use strict'

const AppError = require('../../Error/AppError')
const User = use('App/Models/User')
const crypto = require('crypto')
const Moment = require('moment')
const SendForgotPasswordEmailService = require('../../services/SendForgotPasswordEmailService')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

class ForgotPasswordController {
  async store ({ request, response }) {
    const email = request.input('email')
    const user = await User.findBy('email', email)

    if (!user) {
      throw new AppError('Email not found', 404)
    }

    user.token = crypto.randomBytes(10).toString('hex')
    user.token_created_at = new Date()
    await user.save()

    try {
      SendForgotPasswordEmailService.execute(user)
      return response.status(200).json({ Email: 'sent' })
    } catch (error) {
      return response.status(error.status).json({ Error: { message: error.message } })
    }
  }

  async update ({ request, params }) {
    const password = request.input('password')
    const user = await User.findBy('token', params.token)

    if (!user) {
      throw new AppError('invalid token')
    }

    const isExpired = Moment().subtract(2, 'days').isAfter(user.token_created_at)

    if (isExpired) {
      throw new AppError('expired token')
    }

    user.token = null
    user.token_created_at = null
    user.password = password
    await user.save()
    return user
  }
}

module.exports = ForgotPasswordController
