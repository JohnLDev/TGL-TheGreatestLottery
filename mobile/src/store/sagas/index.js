import { all } from 'redux-saga/effects'
import bet from './bet'
import auth from './auth/'

export default function* rootSaga() {
  return yield all([bet, auth])
}
