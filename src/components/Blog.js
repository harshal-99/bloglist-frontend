import React, { useState } from 'react'

const Blog = ({blog}) => {
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
				<button>like</button>
			</div>
			<div>{blog.author}</div>
		</div>
	)

	return (
		<div style={blogStyle}>
			{view ? compactView() : fullView()}
		</div>
	)
}

export default Blog
