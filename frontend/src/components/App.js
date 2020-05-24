import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import agent from '../agent'
import {APP_LOAD, REDIRECT} from '../constants/actionTypes'
import {Route, Switch} from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'
import Checkout from '../components/Checkout/Checkout'
import {store} from '../store'
import {push} from 'connected-react-router'
import Cookie from 'js-cookie'

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo,
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({type: APP_LOAD, payload, token, skipTracking: true}),
  onRedirect: () =>
    dispatch({type: REDIRECT}),
})

const App = ({redirectTo, appLoaded, appName, currentUser, onLoad, onRedirect}) => {
  useEffect(() => {
    const token = Cookie.get('jwt')
    if (token) {
      agent.setToken(token)
    }

    onLoad(token ? agent.Auth.current() : null, token)
  }, [])

  useEffect(() => {
    if (redirectTo) {
      store.dispatch(push(redirectTo))
      onRedirect()
    }
  }, [redirectTo])

  if (appLoaded) {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </div>
    )
  }

  return (
    <div>
      {null}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
