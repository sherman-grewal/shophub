import auth from './reducers/auth'
import {combineReducers} from 'redux'
import common from './reducers/common'
import home from './reducers/home'
import settings from './reducers/settings'
import {connectRouter} from 'connected-react-router'

export default (history) => combineReducers({
    auth,
    common,
    home,
    settings,
    router: connectRouter(history),
})
