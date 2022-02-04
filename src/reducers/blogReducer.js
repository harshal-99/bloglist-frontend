import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
	switch (action.type) {
		case 'NEW_BLOG':
			return [...state, action.data]
		case 'INIT_BLOGS':
			return action.data
		case 'UPDATE_BLOG':
			return action.data
		case 'DELETE_BLOG':
			return action.data
		default:
			return state
	}
}

export const createBlog = blog => {
	return async dispatch => {
		const newBlog = await blogService.create(blog)
		dispatch({
			type: 'NEW_BLOG',
			data: newBlog
		})
	}
}


export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		blogs.sort((a, b) => b.likes - a.likes)
		dispatch({
			type: "INIT_BLOGS",
			data: blogs
		})
	}
}

export const updateBlog = (blogs, blog) => {
	blog.likes += 1
	const newBlog = {
		likes: blog.likes,
		user: blog.user.id,
		author: blog.author,
		title: blog.title,
		url: blog.url,
	}


	return async dispatch => {
		try {
			const updatedBlog = await blogService.update(blog.id, newBlog)
			const newBlogs = blogs.map(b => b.id !== blog.id ? b : updatedBlog)

			dispatch({
				type: 'UPDATE_BLOG',
				data: newBlogs
			})
		} catch (e) {
			console.dir(e)
		}
	}
}


export const deleteBlog = (blogs, id) => {
	return async dispatch => {
		await blogService.deleteBlog(id)
		const updatedBlog = blogs.filter(blog => blog.id !== id)
		dispatch({
			type: 'DELETE_BLOG',
			data: updatedBlog
		})
	}
}
export default blogReducer
