import React, {useState, useEffect, useRef} from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import {useDispatch, useSelector} from "react-redux";
import {createBlog, initializeBlogs} from "./reducers/blogReducer";
import {setError, setSuccess} from "./reducers/notificationReducer";


const App = () => {
	const [user, setUser] = useState(null)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')


	const blogFormRef = useRef()

	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)


	useEffect(() => {
		blogService
			.getAll()
			.then(() => dispatch(initializeBlogs()))
	}, [])

	useEffect(() => {
			// dispatch(initUser())
			const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
			if (loggedUserJSON) {
				const user = JSON.parse(loggedUserJSON)
				blogService.setToken(user.token)
				setUser(user)
			}
		}, []
	)

	const handleLogin = async (event) => {
		event.preventDefault()
		console.log('logging in with', username, password)
		try {
			const user = await loginService.login({
				username, password
			})

			window.localStorage.setItem(
				'loggedBlogAppUser', JSON.stringify(user)
			)

			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')

			dispatch(setSuccess('login success', 5))
		} catch (e) {
			dispatch(setError(e.response.data.error, 5))
		}
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
			{user === null ? loginForm() : <div>
				<p>{user.name} logged in <button
					onClick={() => {
						window.localStorage.clear()
						console.log('cleared storage')
					}}>logout</button>
				</p>
				{blogForm()}
			</div>}
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} blogs={blogs}
				      deleteBlog={blogService.deleteBlog} user={user}/>
			)}
		</div>
	)
}

export default App
