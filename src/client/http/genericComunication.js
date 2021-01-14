import axios from './axiosConfig'

class genericCommunication {
    static get(url, query_params, body_params, url_param){
        return axios({
            url: '/' + url,
            method: 'GET',
            params: query_params || {},
            data: body_params || {},
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            }
        })
    }

    static delete(url_path, pk){
        return axios({
            url: '/' + url_path + '?_id=' + pk,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            }
        })
    }

    static put(url_path, body_params, query_params, url_param){
        return axios({
            url: '/' + url_path,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            data: body_params,
            params: query_params
        })
    }   

    static post(url_path, body_params, query_params, url_param){
        return axios({
            url: '/' + url_path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            data: body_params,
            params: query_params
        })
    }    
    
    static patch(url_path, body_params, query_params, url_param){
        return axios({
            url: '/' + url_path,
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            data: body_params,
            params: query_params
        })
    }
}

export default genericCommunication;