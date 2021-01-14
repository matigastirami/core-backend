import axios from 'axios'

export default class LoginService {
    
    static signin(username, password){
        return axios.post('/api/signin', 
            {
                username: username,
                password: password
            }
        )
    }

    static signout(){
        localStorage.removeItem('token')
        localStorage.removeItem('loggedIn')
        localStorage.clear()
    }
}