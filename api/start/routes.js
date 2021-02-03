'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/users', 'UserController.index')
Route.get('/users/:id', 'UserController.show')
Route.post('/users', 'UserController.store').validator('CreateUser')
Route.post('/sessions', 'SessionController.store').validator('Session')
Route.patch('/forgot', 'ForgotPasswordController.store').validator('ForgotPasswordEmail')
Route.patch('/forgot-change/:token', 'ForgotPasswordController.update').validator('ForgotPasswordPassword')
Route.get('/confirm/:id', 'SessionController.confirmEmail') // está como método get para poder ser usado no navegador

Route.group(() => {
  Route.put('/users/:id', 'UserController.update')
  Route.delete('/users/:id', 'UserController.delete')
  Route.resource('/types', 'TypeController').validator(new Map([
    [
      ['/types.store'], ['CreateType']
    ],
    [
      ['/types.update'], ['UpdateType']
    ]
  ]))
  Route.resource('/games', 'GameController').validator(new Map([
    [
      ['/games.store'], ['CreateGame']
    ],
    [
      ['/games.update'], ['UpdateGame']
    ]
  ]))
}).middleware('auth')
