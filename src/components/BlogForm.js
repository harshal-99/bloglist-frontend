import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import PropTypes from 'prop-types'

import blogService from "../services/blogs";

import Togglable from "./Togglable";

import {createBlog} from "../reducers/blogReducer";
import {setSuccess} from "../reducers/notificationReducer";

const Form = ({createdBlog}) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')


	const addBlog = event => {
		event.preventDefault()
		createdBlog({
			author,
			title,
			url
		})

		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<h2>Create a new Blog</h2>
			<form onSubmit={addBlog}>
				<div>title:
					<input id="title" type="text" value={title}
					       onChange={({target}) => setTitle(target.value)}/>
				</div>
				<div>author:
					<input id="author" type="text" value={author}
					       onChange={({target}) => setAuthor(target.value)}/>
				</div>
				<div>url:
					<input id="url" type="url" value={url}
					       onChange={({target}) => setUrl(target.value)}/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

const BlogForm = () => {

	const dispatch = useDispatch()

	const addBlog = (blogObject) => {
		blogService
			.create(blogObject)
			.then(returnedBlog => {
				dispatch(createBlog(returnedBlog))
			})
			.catch(error => console.log(error))
		dispatch(setSuccess(`a new blog ${blogObject.title} by ${blogObject.author} added`, 5))
	}

	return (
		<Togglable buttonLabel="new Blog">
			<Form createdBlog={addBlog}/>
		</Togglable>
	)
}


Form.propType = {
	createdBlog: PropTypes.object.isRequired
}

export default BlogForm
