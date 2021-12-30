import React, { useState, useEffect } from 'react'

import Blog         from './components/Blog'
import blogService  from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification";

const App = () => {
	const [ blogs, setBlogs ] = useState([])
	const [ user, setUser ] = useState(null)

	const [ username, setUsername ] = useState('')
	const [ password, setPassword ] = useState('')

	const [ title, setTitle ] = useState('')
	const [ author, setAuthor ] = useState('')
	const [ url, setUrl ] = useState('')

	const [ message, setMessage ] = useState(null)
	const [ className, setClassName ] = useState('')

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
		<form onSubmit={handleLogin}>
			<div>username
				<input
					type="text"
					value={username}
					onChange={({target}) => setUsername(target.value)}
				/>
			</div>
			<div>password
				<input
					type="password"
					value={password}
					onChange={({target}) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	)

	const addBlog = (event) => {
		event.preventDefault()
		const blogObject = {
			author,
			title,
			url,
		}

		blogService
			.create(blogObject)
			.then(returnedBlog => {
				setBlogs(blogs.concat(returnedBlog))
				setTitle('')
				setAuthor('')
				setUrl('')
			})
			.catch(error => console.log(error))

		setMessage(`a new blog ${title} by ${author} added`)
		setClassName('success')
		setTimeout(() => {
			setMessage(null)
		}, 5000)
	}

	const createNewBlog = () => {
		return (
			<form onSubmit={addBlog}>
				<div>title:
					<input type="text" value={title}
					       onChange={({target}) => setTitle(target.value)}/>
				</div>
				<div>author:
					<input type="text" value={author}
					       onChange={({target}) => setAuthor(target.value)}/>
				</div>
				<div>url:
					<input type="url" value={url}
					       onChange={({target}) => setUrl(target.value)}/>
				</div>
				<button type="submit">create</button>
			</form>
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
				{createNewBlog()}
			</div>}
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog}/>
			)}
		</div>
	)
}

export default App
