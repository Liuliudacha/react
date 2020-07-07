import React, { Component } from 'react'

export default class Head extends Component{

	edit(){
		console.log(4567)
		sessionStorage.removeItem('token')
		// this.props.history.push('/login')
	}

	render(){
		return(
			<div className="y_header">
				<div className="y_left">
					<img src={require('../assets/y_logo.png')} alt="" />
					<span>微巴士车队 — 排班</span>
				</div>
				<div className="y_right">
					<span>Hi~ 欢迎登录！</span>
					<div className="y_headBox">
						<img src={require('../assets/photo.png')} alt="" />
						<span>name</span>
					</div>
					<div className="y_editBox">
						<img src={require('../assets/edit.png')} alt="" />
						<span style={{cursor: 'pointer'}} onClick={this.edit.bind(this)}>退出</span>
					</div>
				</div>
			</div>
		)
	}
}