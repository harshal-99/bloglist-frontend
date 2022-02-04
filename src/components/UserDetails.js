import {useRouteMatch} from "react-router";
import PropTypes from "prop-types";

const UserDetails = ({users}) => {


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

UserDetails.protoType = {
	users: PropTypes.array.isRequired
}


export default UserDetails
