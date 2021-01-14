import React, { useState, useEffect } from 'react';
//import "./Login.style.css";
import LoginService from './Login.service'
import classNames from 'classnames';
import HashHistory from '../../history/HashHistory'


const LoginComponent = () => {

    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')

    //Form error handling
    let [usernameError, setUsernameError] = useState(false)
    let [passwordError, setPasswordError] = useState(false)

    /*componentWillMount() {
        if (localStorage.loggedIn || localStorage.loggedIn == true)
            props.history.push('/dashboard')
    }*/

    const handleSubmit = event => {
        event.preventDefault();

        if (username === '') {
            setUsernameError(true)
            return;
        }
        else {
            setUsernameError(true)
        }

        if (password === '') {
            setPasswordError(true)
            return;
        }
        else {
            setPasswordError(false)
        }

        LoginService.signin(username, password)
            .then(res => {
                if (res.data && res.data.token) {
                    localStorage.token = res.data.token;
                    localStorage.username = res.data.username
                    localStorage.email = res.data.email
                    //localStorage.password = res.data.password
                    localStorage._id = res.data._id
                    localStorage.loggedIn = true;
                    HashHistory.push('/dashboard', { role: 'USER_ADM' })
                }
                else {
                    alert("Error en login")
                    console.log("Error LoginService.signin.then: ", res)
                }
            })
            .catch(err => {
                console.log("Error LoginService.signin.catch: ", err)
                //alert(err.response.data.message || 'Ocurrió un error al intentar ingresar al sistema')
            })
    }

    return (
        <div className="uk-card uk-card-default" style={{ padding: 25 }}>
            <h1 className="uk-heading-small">Bienvenido</h1>
            <form onSubmit={handleSubmit} className="uk-flex uk-flex-center uk-flex-column">
                <div>
                    <input
                        id="username"
                        className={classNames("uk-align-center uk-input", {"uk-form-danger": usernameError})}
                        type="text"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        id="password"
                        className={classNames("uk-align-center uk-input", {"uk-form-danger": passwordError})}
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button className="uk-button uk-button-primary">
                    Ingresar
                </button>
            </form>
        </div>
    )
}

//LoginComponent.propTypes = {
//    classes: PropTypes.object.isRequired,
//};

export default LoginComponent;