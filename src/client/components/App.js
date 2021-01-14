import React, { useState, useEffect } from 'react';
import AppRouter from '../routing/AppRouter'
import HashHistory from '../history/HashHistory'
import SideNavComponent from './SideNav/SideNavComponent'
import HeaderComponent from './Header/HeaderComponent'

const MainAppComponent = () => {

	let [ userLoggedIn, setUserLoggedIn ] = useState(false)

	useEffect(() => {
		let token = localStorage.getItem('token')
		console.log("USER: ", token)
		if(token) setUserLoggedIn(!userLoggedIn)
	}, [ ])

	return (
		<div className="app">
			<HeaderComponent />
			<SideNavComponent />
			<main className="uk-container">
				<AppRouter />
			</main>
		</div>
		
	);
}

export default MainAppComponent;