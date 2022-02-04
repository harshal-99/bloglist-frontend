const initialState = {
	message: null,
	className: ''
}

const notificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SUCCESS':
			return action.data
		case 'ERROR':
			return action.data
		case 'HIDE':
			return action.data
		default:
			return state
	}
}

export const setSuccess = (message, displayTime) => {
	return async dispatch => {
		dispatch({
			type: 'SUCCESS',
			data: {
				message,
				className: 'success'
			}
		})

		setTimeout(() => {
			dispatch({
				type: 'HIDE',
				data: {
					message: null,
					className: ''
				}
			})
		}, displayTime * 1000)
	}
}

export const setError = (message, displayTime) => {
	return async dispatch => {
		dispatch({
			type: 'ERROR',
			data: {
				message,
				className: 'error'
			}
		})

		setTimeout(() => {
			dispatch({
				type: 'HIDE',
				data: {
					message: null,
					className: ''
				}
			}, displayTime * 1000)
		})
	}
}

export default notificationReducer
