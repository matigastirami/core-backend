import axios from 'axios'

export default class AppService {

    static create = (code, description, url, token) => {
        return axios({
            url: '/api/app',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            data: {
                code,
                description, 
                url
            }
        })
    }

    static delete = (_id, token) => {
        return axios({
            url: '/api/app',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            params: {
                _id
            }
        })
    }

    static get = (_id, token) => {
        return axios({
            url: '/api/app',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            params: {
                _id
            }
        })
    }

    static search = (token) => {
        return axios({
            url: '/api/app',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        })
    }

    static update = (code, description, url, token) => {
        return axios({
            url: '/api/app',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            data: {
                code,
                description, 
                url
            }
        })
    }

}