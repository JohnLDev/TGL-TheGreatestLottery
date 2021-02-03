import { all, takeEvery, call, put } from 'redux-saga/effects'
import { Types, addSuccess, addFail } from '../ducks/bet'
import api from '../../services/api'
function* addBetToApi({ payload }) {
  try {
    const { data } = yield call(api.post, '/games', payload)
    const [step1] = data.created_at.split(' ')
    const date = step1.replace(/[-]/g, '/')
    payload.id = data.id
    payload.date = date

    yield put(addSuccess(payload))
  } catch (error) {
    console.log(error)
    yield put(addFail())
  }
}
export default all([takeEvery(Types.ADD_REQUEST, addBetToApi)])
