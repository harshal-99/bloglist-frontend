import React, { useState, useEffect } from 'react'

import Blog        from './components/Blog'
import blogService from './services/blogs'

const App = () => {
	const [ blogs, setBlogs ] = useState([])
	const [ username, setUsername ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ user, setUser ] = useState(null)
	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	const loginForm = () => (
		<form onSubmit={null}>
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

	return (
		<div>
			<h2>blogs</h2>
			{user === null ? loginForm() : <div>
				<p>{user.name} logged-in</p>
			</div>}
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog}/>
			)}
		</div>
	)
}

export default App
