import userService from "../services/user";
import {useEffect, useState} from "react";

const User = ({user}) => {
	return (
		<tr>
			<td>{user.name}</td>
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
					<th></th>
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
