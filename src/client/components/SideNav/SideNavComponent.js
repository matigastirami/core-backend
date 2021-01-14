import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import UIkit from 'uikit';
import HashHistory from '../../history/HashHistory';
import SessionService from '../Login/Login.service'

const SideNavComponent = () => {

    let [open, setOpen] = useState()
    let [userLoggedIn, setUserLoggedIn] = useState(true)
    let activeStyle = { color: 'white' }

    useEffect(() => {
        UIkit.offcanvas('#offcanvas-slide', {
            mode: 'slide'
        });
    }, [ open ])

    const handleLogOut = () => {
        SessionService.signout()
        HashHistory.push('/')
        //setUserLoggedIn(false)
    }

    return (
        <>
            <div id="offcanvas-slide" className="uk-light">
                <div className="uk-offcanvas-bar">
                    {
                        userLoggedIn &&
                        (
                        <ul className="uk-nav uk-nav-default">
                            <li className="uk-nav-header">Administración</li>
                            <li>
                                <NavLink to="/dashboard" activeStyle={activeStyle}><span uk-icon="grid"></span>&nbsp;Dashboard</NavLink>
                            </li>
                                
                            <li>
                                <NavLink to="/users" activeStyle={activeStyle}><span uk-icon="users"></span>&nbsp;Usuarios</NavLink>
                            </li>
                            <li>
                                <NavLink to="/roles" activeStyle={activeStyle}><span uk-icon="cog"></span>&nbsp;Roles</NavLink>
                            </li>
                            <li>
                                <NavLink to="/apps" activeStyle={activeStyle}><span uk-icon="desktop"></span>&nbsp;Aplicaciones</NavLink>
                            </li>
                            <li>
                                <NavLink to="/companies" activeStyle={activeStyle}><span uk-icon="server"></span>&nbsp;Empresas</NavLink>
                            </li>
                            <li className="uk-nav-divider"></li>
                            <li className="uk-nav-header">Mi cuenta</li>
                            <li>
                                <NavLink to="/myprofile" activeStyle={activeStyle}><span uk-icon="settings"></span>&nbsp;Perfil</NavLink>
                            </li>
                            <li>
                                <a onClick={handleLogOut}><span uk-icon="sign-out"></span>&nbsp;Salir</a>
                            </li>
                        </ul>
                        ) ||
                        (
                            <ul className="uk-nav uk-nav-default">
                                <li className="uk-nav-header">Administración</li>
                                <li className="uk-active"><a href="#/"><span uk-icon="users"></span>&nbsp;Ingresar</a></li>
                            </ul>
                        )
                    }
                    

                </div>
            </div>
        </>
    )
}

/*SideNavComponent.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};*/

export default SideNavComponent;