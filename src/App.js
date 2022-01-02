import React, { useState, useEffect, useRef } from 'react'

import Blog         from './components/Blog'
import blogService  from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification";
import Togglable    from "./components/Togglable";
import LoginForm    from "./components/LoginForm";
import BlogForm     from "./components/BlogForm";

const App = () => {
	const [ blogs, setBlogs ] = useState([])
	const [ user, setUser ] = useState(null)

	const [ username, setUsername ] = useState('')
	const [ password, setPassword ] = useState('')

	const [ message, setMessage ] = useState(null)
	const [ className, setClassName ] = useState('')

	const blogFormRef = useRef()

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

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

			setMessage('login success')
			setClassName('success')
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		} catch (e) {
			setMessage(e.response.data.error)
			setClassName('error')
			setTimeout(() => {
				setMessage(null)
			}, 5000)
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
		// blogFormRef.current.toggleVisiblity()

		blogService
			.create(blogObject)
			.then(returnedBlog => {
				setBlogs(blogs.concat(returnedBlog))
			})
			.catch(error => console.log(error))

		setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
		setClassName('success')
		setTimeout(() => {
			setMessage(null)
		}, 5000)
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
			<Notification message={message} className={className}/>
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
				<Blog key={blog.id} blog={blog} setBlogs={setBlogs}/>
			)}
		</div>
	)
}

export default App
