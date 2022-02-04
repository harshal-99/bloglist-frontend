import {useRouteMatch} from "react-router";

import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../reducers/usersReducer";

const UserDetails = () => {
	const dispatch = useDispatch()
	const users = useSelector(state => state.users)

	useEffect(() => {
		dispatch(getAllUsers())
	}, [])

	const match = useRouteMatch('/users/:id')
	const user = match
		? users.find(user => user.id.toString() === String(match.params.id))
		: null


	if (user === null || user === undefined) {
		return null
	}

	return (
		<div>
			<h1>{user.name}</h1>
			<h3>added blogs</h3>
			<ul>
				{user.blogs.map(blog => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</div>
	)
}


export default UserDetails
