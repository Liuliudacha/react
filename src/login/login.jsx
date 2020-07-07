import React, { Component } from 'react'
import { message } from 'antd'
import { login } from '../api/api'

export default class Login extends Component {
	
	login(){
		let params = { phone : this.username.value , password : this.password.value }
		login(params).then(res=>{
			if(res.status === 2000){
				sessionStorage.setItem('token' , res.data.access_token )
				message.success('登录成功')
				this.props.history.push('/')
			}else{
				message.error(res.msg)
			}
		})
	}

	render(){
		return (
			<div className="login">
				<div className="leftBox">
					<img src={require('../assets/logo.png')} alt="" />
				</div>
				<div className="y_rightBox">
					<div className="y_login">欢迎登录</div>
					<div className="username">
						<div className="">账号</div>
						<input type="text" ref={i => this.username = i} placeholder="请输入账号" />
					</div>
					<div className="password">
						<div className="">密码</div>
						<input type="password" ref={i => this.password = i} placeholder="请输入密码" />
					</div>
					<div className="sureLogin" onClick={this.login.bind(this)}>登录</div>
				</div>
			</div>
		)
	}
}
