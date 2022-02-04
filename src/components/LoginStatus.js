import {initialState, logout} from "../reducers/userReducer";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

import BlogForm from "./BlogForm";
import LoginForm from "./LoginForm";


const LoginStatus = () => {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()
	const handleLogout = () => {
		dispatch(logout)
	}

	return (
		<>
		{user === initialState ? <LoginForm/> : <div>
			<p>{user.name} logged in <button
				onClick={handleLogout}>logout</button>
			</p>
			<BlogForm/>
		</div>
		}
		</>
	)
}

export default LoginStatus
