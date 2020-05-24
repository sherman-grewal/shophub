import {
    APP_LOAD,
    REDIRECT,
    LOGOUT,
    SETTINGS_SAVED,
    LOGIN,
    REGISTER,
    HOME_PAGE_UNLOADED,
    PROFILE_PAGE_UNLOADED,
    SETTINGS_PAGE_UNLOADED,
    LOGIN_PAGE_UNLOADED,
    REGISTER_PAGE_UNLOADED,
} from '../constants/actionTypes'

const defaultState = {
    appLoaded: false,
    appName: 'shophub',
    currentUser: null,
    redirectTo: '/',
    token: null,
    viewChangeCounter: 0,
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                token: action.token || null,
                appLoaded: true,
                currentUser: action.payload ? action.payload.user : null,
            }
        case REDIRECT:
            return {...state, redirectTo: null}
        case LOGOUT:
            return {...state, redirectTo: '/login', token: null, currentUser: null}
        case SETTINGS_SAVED:
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                currentUser: action.error ? null : action.payload.user,
            }
        case LOGIN:
            return {
                ...state,
                redirectTo: action.error ? null : '/',
            }
        case REGISTER:
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                token: action.error ? null : action.payload.user.token,
                currentUser: action.error ? null : action.payload.user,
            }
        case HOME_PAGE_UNLOADED:
        case PROFILE_PAGE_UNLOADED:
        case SETTINGS_PAGE_UNLOADED:
        case LOGIN_PAGE_UNLOADED:
        case REGISTER_PAGE_UNLOADED:
            return {...state, viewChangeCounter: state.viewChangeCounter + 1}
        default:
            return state
    }
}
