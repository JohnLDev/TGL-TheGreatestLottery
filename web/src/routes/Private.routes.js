import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogged = useSelector(state => state.auth.isLogged)

  return (
    <Route
      {...rest}
      render={() => {
        return isLogged ? <Component /> : <Redirect to={{ pathname: '/' }} />
      }}
    />
  )
}
export default PrivateRoute
