'use strict'

import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom'
//import { LoadingSpinerComponent } from './components/Loading/LoadingComponent'
import App from './components/App'

window.React = React;

const routing = (
	<HashRouter>
		<App />
	</HashRouter>
)

render(
	routing,
	document.getElementById('app')
);