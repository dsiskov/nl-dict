import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from "./pages/homePage";

import 'bootstrap/dist/css/bootstrap.min.css';
import packageJson from '../package.json';

const getBasename = () => {
	const { homepage } = packageJson;
	console.log(homepage);
	const url = new URL(homepage);

	return url.pathname;
};

export default class App extends Component {

	render() {
		return (
			<Router basename={getBasename()}>
				<div className="App">
					<Switch>
						<Route path="/" component={HomePage} exact />
					</Switch>
				</div>
			</Router>
		);
	}
};