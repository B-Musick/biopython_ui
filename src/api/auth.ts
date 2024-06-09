import api from '../api/interceptor'

export function getCurrentUser() {
    return api.get('/api/user/')
        .then(res => res.data);
}

export function login(userDetails) {
    console.log(userDetails)
    return api.post('/api/token/', userDetails)
        .then(res=> res)
}

export function register(userDetails) {
    console.log(userDetails)
    return api.post('/api/user/register/', userDetails)
        .then(res=> res)
}