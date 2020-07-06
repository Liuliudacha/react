import React, { useState } from 'react'

function Login() {

	const [ name , setName ] = useState('')
	const [ password , setPassword ] = useState('')

	function login(){
		console.log(name)
		console.log(password)
	}

	function change(e){
		console.log(e)
	}

	return (
		<div className="login">
			<div className="leftBox">
				<img src={(require('../assets/logo.png'))} alt="" />
			</div>
			<div className="y_rightBox">
				<div className="y_login">欢迎登录</div>
				<div className="username">
					<div className="">账号</div>
					<input type="text" onChange={change} value={name} placeholder="请输入账号" />
				</div>
				<div className="password">
					<div className="">密码</div>
					<input type="password" value={password} placeholder="请输入密码" />
				</div>
				<div className="sureLogin" onClick={login.bind(this)}>登录</div>
			</div>
		</div>
	)
}

export default Login