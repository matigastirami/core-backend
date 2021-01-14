/* React.js imports */
import React, { useState, useEffect } from 'react';
import UIkit from 'uikit';
import HashHistory from '../../history/HashHistory';

const Header = () => {

    let [open, setOpen] = useState(false)
    let [userLoggedIn, setUserLoggedIn] = useState(false)
    let [anchorEl, setAnchorEl] = useState(null)

    useEffect(() => {
        var userLoggedIn = localStorage.getItem('token')
        setUserLoggedIn(userLoggedIn ? true : false)
    }, [])

    const handleDrawerOpen = () => {
        setOpen(true)
    };

    const handleDrawerClose = () => {
        setOpen(false)
    };

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget)
    };

    const handleMenuClose = () => {
        setAnchorEl(null)
        //this.handleMobileMenuClose();
    };

    /*handleMobileMenuOpen = event => {
        setmo
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };*/

    /*handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };*/

    const handleRedirect = (path) => {
        //console.log(HashHistory.location)
        var currentUrl = HashHistory.location.pathname.substr(1);
        if (currentUrl != path) {
            HashHistory.push('/' + path)
            setOpen(false)
        }
    }

    const toggleMenu = () => {
        UIkit.offcanvas('#offcanvas-slide').show();
    }

    return (
        <nav className="uk-navbar uk-navbar-container uk-margin">
            <div className="uk-navbar-left">
                <a className="uk-navbar-toggle" uk-icon="icon: menu; ratio: 2" onClick={toggleMenu}></a>
            </div>
        </nav>
    )
}

export default Header;