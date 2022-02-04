import blogService from "../services/blogs";
import loginService from "../services/login";

const initialState = {
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
			return state
		}
		case 'INIT_USER': {
			return state
		}
		default:
			return state
	}
}


/*export const login = (username, password) => {
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
}*/

export const initUser = () => {
	const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
	if (loggedUserJSON) {
		const user = JSON.parse(loggedUserJSON)
		blogService.setToken(user.token)
		return {
			type: 'LOGIN',
			data: user
		}
	}
}

/*export const logout = () => {
	window.localStorage.clear()
	console.log('cleared storage')
	return {
		type: 'LOGOUT',
		data: initialState
	}
}*/

export default userReducer
