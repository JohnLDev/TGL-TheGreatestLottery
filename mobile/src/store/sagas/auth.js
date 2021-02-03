import { all, takeLatest, call, put } from 'redux-saga/effects'
import api from '../../services/api'
import { loginSuccess, loginFAilure } from '../ducks/auth'
import { FirsGet } from '../ducks/bet'
import { get } from '../ducks/type'

function* HandleApiLogin({ payload }) {
  console.log(payload)
  try {
    const { data } = yield call(api.post, '/sessions', payload)
    api.defaults.headers.authorization = `Bearer ${data.token.token}`
    yield put(loginSuccess(data.user, data.token.token))
    const { data: games } = yield call(
      api.get,
      `/games?user_id=${data.user.id}`,
    )
    let array = []
    for (let index = 0; index < games.length; index++) {
      const [step1] = games[index].created_at.split(' ')
      const date = step1.replace(/[-]/g, '/')
      const item = {
        id: games[index].id,
        game: games[index].type ? games[index].type.type : 'discontinued',
        price: games[index].price,
        numbers: games[index].numbers,
        color: games[index].type ? games[index].type.color : '#000000',
        date,
      }
      array = [...array, item]
    }
    yield put(FirsGet(array))
    const ResponseTypes = yield call(api.get, '/types')
    yield put(get(ResponseTypes.data))
  } catch (error) {
    console.log(error)
    if (error.response) {
      yield put(loginFAilure(error.response.data.error.message))
      return
    }
    console.log(error)
  }
}

export default all([takeLatest('auth/LOGIN_REQUEST', HandleApiLogin)])
