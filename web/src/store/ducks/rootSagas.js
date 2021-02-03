import { all } from 'redux-saga/effects'
import bet from './bet/sagas'
import auth from './auth/sagas'

export default function* rootSaga() {
  return yield all([bet, auth])
}
