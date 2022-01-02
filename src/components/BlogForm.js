import { useState } from "react";
import PropTypes    from "prop-types";

const BlogForm = ({createdBlog}) => {
	const [ title, setTitle ] = useState('')
	const [ author, setAuthor ] = useState('')
	const [ url, setUrl ] = useState('')


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
		</div>
	)
}

BlogForm.propType = {
	createdBlog: PropTypes.object.isRequired
}

export default BlogForm
