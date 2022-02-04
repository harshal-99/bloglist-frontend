import React from "react";
import {deleteBlog, updateBlog} from "../reducers/blogReducer";
import {useDispatch, useSelector} from "react-redux";
import {useRouteMatch} from "react-router";

const BlogDetails = () => {
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	const match = useRouteMatch('/blogs/:id')
	const blog = match
		? blogs.find(blog => blog.id.toString() === String(match.params.id))
		: null

	const updateLike = async () => {
		dispatch(updateBlog(blog))
	}

	const handleBlogDelete = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			dispatch(deleteBlog(blog.id))
		}
	}

	return (
		<div>
			<h1>{blog.title}</h1>
			<div>{blog.url}</div>
			<div>likes {blog.likes}
				<button onClick={updateLike}>like</button>
			</div>
			<div>added by {blog.author}</div>
			{blog.user.username === user?.username && (
				<button onClick={handleBlogDelete}>remove</button>)}
		</div>
	)

}

export default BlogDetails
