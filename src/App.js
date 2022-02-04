import React, {useEffect} from 'react'
import {useDispatch} from "react-redux";
import {Route, Switch} from "react-router";


import blogService from './services/blogs'

import {initializeBlogs} from "./reducers/blogReducer";
import {initUser} from "./reducers/userReducer";

import Notification from './components/Notification'
import Blogs from "./components/Blogs";
import LoginStatus from "./components/LoginStatus";
import Users from "./components/Users";
import UserDetails from "./components/UserDetails";
import BlogDetails from "./components/BlogDetails";


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
				<Route path="/users/:id">
					<UserDetails/>
				</Route>
				<Route path="/users">
					<Users/>
				</Route>
				<Route path="/blogs/:id">
					<BlogDetails/>
				</Route>
				<Route path="/blogs">
					<Blogs/>
				</Route>
				<Route path="/">
					<Blogs/>
				</Route>
			</Switch>
		</div>
	)
}

export default App
