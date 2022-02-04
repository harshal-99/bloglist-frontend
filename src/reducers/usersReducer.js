import userService from "../services/user";

const initialState = []

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INIT_USERS': {
			return action.data
		}
		default:
			return state
	}
}

export const getAllUsers = () => {
	return async dispatch => {
		const users = await userService.getAll()
		dispatch({
			type: 'INIT_USERS',
			data: users
		})
	}
}

export default usersReducer
