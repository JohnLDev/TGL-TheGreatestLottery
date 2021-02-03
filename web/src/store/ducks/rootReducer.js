import { combineReducers } from 'redux'

import auth from './auth/auth'
import bet from './bet/bet'
import type from './type/type'

export default combineReducers({ auth, bet, type })
