import userService from "../services/user";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const User = ({user}) => {
	return (
		<tr>
			<td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
			<td>{user.blogs.length}</td>
		</tr>
	)
}

const Users = () => {
	const [users, setUsers] = useState([])

	useEffect(() => {
		const getData = async () => {
			setUsers(await userService.getAll())
		}
		getData()
	}, [])

	return (
		<div>
			<h1>Users</h1>
			<table>
				<thead>
				<tr>
					<th> </th>
					<th>
						blogs created
					</th>
				</tr>
				</thead>
				<tbody>
				{users && users.map(user => (
					<User key={user.id} user={user}/>
				))}
				</tbody>
			</table>
		</div>
	)

}

export default Users
