import { all, takeEvery, call, put } from 'redux-saga/effects'
import { Types, addSuccess, addFail } from './bet'
import api from '../../../services/api'
function* addBetToApi({ payload }) {
  try {
    const { data } = yield call(api.post, '/games', payload)
    payload.id = data.id
    payload.date = new Date(data.created_at).toLocaleDateString()

    yield put(addSuccess(payload))
  } catch (error) {
    yield put(addFail())
  }
}
export default all([takeEvery(Types.ADD_REQUEST, addBetToApi)])
