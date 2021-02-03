import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import Routes from './routes/index.routes'
import GlobalStyle from './styles/global'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store, persistor } from './store'

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Routes />
          </Router>
        </PersistGate>
      </Provider>
      <ToastContainer />
    </>
  )
}

export default App
