import axios from 'axios';

export default class UserService {

    static signIn = (username, password) => {
        return axios.post('/api/signin', 
            {
                username: username,
                password: password
            }
        )
    }
    
    static signout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('loggedIn')
        localStorage.clear()
    }

    static create = () => {

    }

    static delete = () => {

    }

    static search = () => {

    }

    static get = () => {

    }

    static update = (userId, data) => {
        return axios({
            url: `/api/user`,
            method: 'PUT',
            data,
            params: {
                _id: userId
            },
            headers: {
                Authorization: localStorage.token
            }
        })
    }

}