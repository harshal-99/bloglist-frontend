import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

import {createBlog, initializeBlogs} from "./reducers/blogReducer";
import {setError, setSuccess} from "./reducers/notificationReducer";
import {initialState, initUser, login, logout} from "./reducers/userReducer";


const App = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const blogFormRef = useRef()

	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.user)


	useEffect(() => {
		blogService
			.getAll()
			.then(() => dispatch(initializeBlogs()))
	}, [])

	useEffect(() => {
			dispatch(initUser)
		}, []
	)

	const handleLogin = async (event) => {
		event.preventDefault()
		console.log('logging in with', username, password)
		try {
			dispatch(login(username, password))
			setUsername('')
			setPassword('')

			dispatch(setSuccess('login success', 5))
		} catch (e) {
			dispatch(setError(e.response.data.error, 5))
		}
	}

	const handleLogout = () => {
		dispatch(logout)
	}

	const loginForm = () => (
		<Togglable buttonLabel="log in">
			<LoginForm
				username={username}
				password={password}
				handleUsernameChange={({target}) => setUsername(target.value)}
				handlePasswordChange={({target}) => setPassword(target.value)}
				handleSubmit={handleLogin}
			/>
		</Togglable>
	)

	const addBlog = (blogObject) => {

		blogService
			.create(blogObject)
			.then(returnedBlog => {
				dispatch(createBlog(returnedBlog))
			})
			.catch(error => console.log(error))
		dispatch(setSuccess(`a new blog ${blogObject.title} by ${blogObject.author} added`, 5))
	}

	const blogForm = () => {
		return (
			<Togglable buttonLabel="new Blog" ref={blogFormRef}>
				<BlogForm createdBlog={addBlog}/>
			</Togglable>
		)
	}

	return (
		<div>
			<h2>blogs</h2>
			<Notification/>
			{user === initialState ? loginForm() : <div>
				<p>{user.name} logged in <button
					onClick={handleLogout}>logout</button>
				</p>
				{blogForm()}
			</div>}
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} blogs={blogs}
				      deleteBlog={blogService.deleteBlog} />
			)}
		</div>
	)
}

export default App
