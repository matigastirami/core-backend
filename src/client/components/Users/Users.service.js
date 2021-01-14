import axios from '../../http/axiosConfig'

export default class UsersService {

    static getMyProfileInfo(userId) {
        return axios.get('/myprofile',
            {
                headers: {
                    authorization: localStorage.getItem('token')
                },
                params: {
                    _id: userId
                }
            }
        )
    }
    
    static getUsersList(){
        return axios.get('/userList', 
            {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            }
        )
    }

    static createUser(data){
        return axios(
            {
                headers: {
                    authorization: localStorage.getItem('token')
                },
                url: '/user',
                method: 'post',
                data: data
            }
        )
    }

    static deleteUser(_id){
        return axios.delete('/user',
            {
                headers: {
                    authorization: localStorage.getItem('token'),
                },
                params: {
                    _id: _id
                }
            }
        )
    }

    static updateUser(data){
        return axios(
            {
                headers: {
                    authorization: localStorage.getItem('token')
                },
                url: '/user',
                method: 'put',
                data: data
            }
        )
    }
}