import React, {useState} from 'react'
import PropTypes from 'prop-types'

import {useDispatch} from "react-redux";
import {updateBlog} from "../reducers/blogReducer";
import {deleteBlog} from "../reducers/blogReducer";

const Blog = ({blog, blogs, user}) => {
	const dispatch = useDispatch()

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const [view, setView] = useState(true)

	const viewLabel = view ? 'view' : 'hide'

	const toggleView = () => {
		setView(!view)
	}

	const updateLike = async () => {
		dispatch(updateBlog(blogs, blog))
	}

	const handleBlogDelete = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			dispatch(deleteBlog(blogs, blog.id))
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
			{blog.user.username === user?.username && (
				<button onClick={handleBlogDelete}>remove</button>)}
		</div>
	)

	return (
		<div style={blogStyle} className="blog">
			{view ? compactView() : fullView()}
		</div>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	blogs: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired
}

export default Blog
