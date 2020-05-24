import agent from './agent'
import {
    ASYNC_START,
    ASYNC_END,
    LOGIN,
    LOGOUT,
    REGISTER,
} from './constants/actionTypes'
import Cookie from "js-cookie"

function isPromise(v) {
    return v && typeof v.then === 'function'
}

const promiseMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
        store.dispatch({type: ASYNC_START, subtype: action.type})

        const currentView = store.getState().viewChangeCounter
        const skipTracking = action.skipTracking

        action.payload.then(
            res => {
                const currentState = store.getState()

                if (!skipTracking && currentState.viewChangeCounter !== currentView) {
                    return
                }

                action.payload = res

                store.dispatch({type: ASYNC_END, promise: action.payload})
                store.dispatch(action)
            },
            error => {
                const currentState = store.getState()

                if (!skipTracking && currentState.viewChangeCounter !== currentView) {
                    return
                }

                action.error = true
                action.payload = error.response.body

                if (!action.skipTracking) {
                    store.dispatch({type: ASYNC_END, promise: action.payload})
                }

                store.dispatch(action)
            },
        )

        return
    }

    next(action)
}

const localStorageMiddleware = store => next => action => {
    if (action.type === REGISTER || action.type === LOGIN) {
        if (!action.error) {
            Cookie.set('jwt', action.payload.user.token)
            agent.setToken(action.payload.user.token)
        }
    } else if (action.type === LOGOUT) {
        Cookie.set('jwt', '')
        agent.setToken(null)
    }
    next(action)
}

export {promiseMiddleware, localStorageMiddleware}
