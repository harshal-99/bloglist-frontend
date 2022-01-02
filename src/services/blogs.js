import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

let token

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const create = async newObject => {
	const config = {
		headers: {Authorization: token}
	}
	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const update = async (id, object) => {
	const response = await axios.put(`${baseUrl}/${id}`, object)
	return response.data
}

const blogService = {getAll, setToken, create, update}

export default blogService
