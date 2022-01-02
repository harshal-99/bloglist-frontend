import React, { useState } from 'react'

import blogService from "../services/blogs";

const Blog = ({blog, setBlogs, deleteBlog, user}) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const [ view, setView ] = useState(true)

	const viewLabel = view ? 'view' : 'hide'

	const toggleView = () => {
		setView(!view)
	}

	const updateLike = async () => {
		blog.likes += 1
		const newBlog = {
			likes: blog.likes,
			user: blog.user.id,
			author: blog.author,
			title: blog.title,
			url: blog.url,
		}

		try {
			const updatedBlog = await blogService.update(blog.id, newBlog)
			setBlogs((prev) => {
				prev.map(b => b.id !== blog.id ? b : updatedBlog)
			})
		} catch (e) {
			console.dir(e)
		}
	}

	const handleBlogDelete = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			deleteBlog(blog.id)
		}
	}
	const compactView = () => (
		<div>
			{blog.title}
			<button onClick={toggleView}>{viewLabel}</button>
		</div>
	)
	const fullView = () => (
		<div>
			<div>{blog.title}
				<button onClick={toggleView}>{viewLabel}</button>
			</div>
			<div>{blog.url}</div>
			<div>
				likes {blog.likes}
				<button onClick={updateLike}>like</button>
			</div>
			<div>{blog.author}</div>
			{blog.user.username === user.username && (
				<button onClick={handleBlogDelete}>remove</button>)}
		</div>
	)

	return (
		<div style={blogStyle}>
			{view ? compactView() : fullView()}
		</div>
	)
}

export default Blog
