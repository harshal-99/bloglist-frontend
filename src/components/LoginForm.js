import React, {useState} from "react";
import {login} from "../reducers/userReducer";
import {setError, setSuccess} from "../reducers/notificationReducer";
import {useDispatch} from "react-redux";
import Togglable from "./Togglable";

const Form = () => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()

	const handlePasswordChange = ({target}) => setPassword(target.value)
	const handleUsernameChange = ({target}) => setUsername(target.value)

	const handleSubmit = async (event) => {
		event.preventDefault()
		console.log('logging in with', username, password)
		try {
			dispatch(login(username, password))
			setUsername('')
			setPassword('')

			dispatch(setSuccess('login success', 5))
		} catch (e) {
			dispatch(setError(e.response.data.error, 5))
		}
	}

	return (
		<div>
			<h2>Login</h2>

			<form onSubmit={handleSubmit}>
				<div>
					username
					<input
						value={username}
						onChange={handleUsernameChange}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						onChange={handlePasswordChange}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

const LoginForm = () => {
	return (
		<Togglable buttonLabel="log in">
			<Form/>
		</Togglable>
	)
}

export default LoginForm
