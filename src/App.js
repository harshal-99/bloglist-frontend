import React, {useEffect} from 'react'
import {useDispatch} from "react-redux";


import blogService from './services/blogs'

import {initializeBlogs} from "./reducers/blogReducer";
import {initUser} from "./reducers/userReducer";

import Notification from './components/Notification'
import Blogs from "./components/Blogs";
import LoginStatus from "./components/LoginStatus";
import {Route, Switch} from "react-router";
import Users from "./components/Users";


const App = () => {
	const dispatch = useDispatch()

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
