import blogService from "../services/blogs";
import loginService from "../services/login";

export const initialState = {
	user: "",
	password: "",
	token: ""
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN': {
			return action.data
		}
		case 'LOGOUT': {
			return action.data
		}
		case 'INIT_USER': {
			return action.data
		}
		default:
			return state
	}
}


export const login = (username, password) => {
	return async dispatch => {
		const user = await loginService.login({username, password})

		window.localStorage.setItem(
			'loggedBlogAppUser', JSON.stringify(user)
		)

		blogService.setToken(user.token)

		dispatch({
			type: 'LOGIN',
			data: user
		})
	}
}

export const initUser = () => {
	const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
	if (loggedUserJSON) {
		const user = JSON.parse(loggedUserJSON)
		blogService.setToken(user.token)
		return {
			type: 'LOGIN',
			data: user
		}
	} else {
		return {
			type: 'LOGOUT',
			data: initialState
		}
	}
}

export const logout = () => {
	window.localStorage.clear()
	console.log('cleared storage')
	return {
		type: 'LOGOUT',
		data: initialState
	}
}

export default userReducer
