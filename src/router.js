import React, { Component } from 'react'
import './index.css'
import { BrowserRouter as Router , Route } from 'react-router-dom'

import Login from './login/login'
import Index from './index/index'
import Head from './head/head'


export default class App extends Component{
	render(){
		return(
			<Router>
				<Route exact path="/" component={Index}></Route>
				<Route path="/login" component={Login}></Route>
				<Route path="/Head" component={Head}></Route>
			</Router>
		)
	}
}