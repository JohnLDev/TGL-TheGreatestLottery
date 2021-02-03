import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from './Private.routes'
import SignIn from '../pages/SignIn'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import NewBet from '../pages/NewBet'
import Account from '../pages/Account'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={SignIn} />
        <Route exact path='/forgot-password' component={ForgotPassword} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/forgot/:token' component={ResetPassword} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/newbet' component={NewBet} />
        <PrivateRoute exact path='/account' component={Account} />

        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  )
}
export default Routes
