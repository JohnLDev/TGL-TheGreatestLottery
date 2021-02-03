import { all, takeLatest, call, put } from 'redux-saga/effects'
import api from '../../../services/api'
import { loginSuccess, loginFAilure } from './auth'
import { FirsGet } from '../bet/bet'
import { get } from '../type/type'

function* HandleApiLogin({ payload }) {
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
      const item = {
        id: games[index].id,
        game: games[index].type ? games[index].type.type : 'discontinued',
        price: games[index].price,
        numbers: games[index].numbers,
        color: games[index].type ? games[index].type.color : '#000000',
        date: new Date(games[index].created_at).toLocaleDateString(),
      }
      array = [...array, item]
    }

    yield put(FirsGet(array))

    const ResponseTypes = yield call(api.get, '/types')

    yield put(get(ResponseTypes.data))
  } catch (error) {
    if (error.response) {
      yield put(loginFAilure(error.response.data.error.message))
      return
    }
    console.log(error)
  }
}

export default all([takeLatest('auth/LOGIN_REQUEST', HandleApiLogin)])
