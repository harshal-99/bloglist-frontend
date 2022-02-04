import React from 'react'
import PropTypes from 'prop-types'

import {Link} from "react-router-dom";

const Blog = ({blog}) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const compactView = () => (
		<Link to={`/blogs/${blog.id}`}>
			{blog.title}
		</Link>
	)

	return (
		<div style={blogStyle} className="blog">
			{compactView()}
		</div>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
}

export default Blog
