import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {Route, Switch} from "react-router";


import blogService from './services/blogs'

import {initializeBlogs} from "./reducers/blogReducer";
import {initUser} from "./reducers/userReducer";

import Notification from './components/Notification'
import Blogs from "./components/Blogs";
import LoginStatus from "./components/LoginStatus";
import Users from "./components/Users";
import userService from "./services/user";
import UserDetails from "./components/UserDetails";


const App = () => {
	const dispatch = useDispatch()

	const [users, setUsers] = useState([])

	useEffect(() => {
		userService
			.getAll()
			.then(users => setUsers(users))
	}, [])

	useEffect(() => {
		blogService
			.getAll()
			.then(() => dispatch(initializeBlogs()))
	}, [])

	useEffect(() => {
			dispatch(initUser)
		}, []
	)

	return (
		<div>
			<h2>blogs</h2>
			<Notification/>
			<LoginStatus/>
			<Switch>
				<Route path="/users/:id">
					<UserDetails users={users}/>
				</Route>
				<Route path="/users">
					<Users/>
				</Route>
				<Route path="/">
					<Blogs/>
				</Route>
			</Switch>
		</div>
	)
}

export default App
