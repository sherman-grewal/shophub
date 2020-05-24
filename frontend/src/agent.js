import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise)

const API_ROOT = 'http://192.168.0.153:8080/api'

const responseBody = res => res.body

let token = null
const tokenPlugin = req => {
    if (token) {
        req.set('Authorization', `Token ${token}`)
    }
}

const requests = {
    del: url =>
        superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
}

const Auth = {
    current: () =>
        requests.get('/user/'),
    login: (email, password) =>
        requests.post('/users/login', {user: {email, password}}),
    register: (firstName, lastName, email, password) =>
        requests.post('/users/', {user: {firstName, lastName, email, password}}),
    save: user =>
        requests.put('/user', {user}),
}

export default {
    Auth,
    setToken: _token => {
        token = _token
    },
}
