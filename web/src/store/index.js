import { createStore, applyMiddleware } from 'redux'
import reducers from './ducks/rootReducer'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import { encryptTransform } from 'redux-persist-transform-encrypt'

import createSagaMiddleware from 'redux-saga'
import rootSaga from './ducks/rootSagas'

const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    encryptTransform({
      secretKey: 'MY-SUPER-SECRET-KEY',
      onError: () => {
        sessionStorage.clear()
      },
    }),
  ],
}
const pReducers = persistReducer(persistConfig, reducers)

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

const store = createStore(pReducers, applyMiddleware(...middlewares))
const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)
export { store, persistor }
