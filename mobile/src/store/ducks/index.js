import { combineReducers } from 'redux'

import auth from './auth'
import bet from './bet'
import type from './type'
import cart from './cart'

export default combineReducers({ auth, bet, type, cart })
