import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import {prettyDOM} from '@testing-library/dom'

import Form from "./BlogForm";

test('<BlogForm /> returns correct values', () => {
	const createdBlog = jest.fn()

	const component = render(
		<Form createdBlog={createdBlog}/>
	)

	const author = component.container.querySelector('#author')
	const title = component.container.querySelector('#title')
	const url = component.container.querySelector('#url')
	const form = component.container.querySelector('form')

	fireEvent.change(title, {
		target: {value: 'new blog'}
	})

	fireEvent.change(author, {
		target: {value: 'harshal'}
	})

	fireEvent.change(url, {
		target: {value: "https://fullstackopen.com/en/part5/testing_react_apps"}
	})

	fireEvent.submit(form)

	expect(createdBlog.mock.calls).toHaveLength(1)
	expect(createdBlog.mock.calls[0][0].author).toBe('harshal')
	expect(createdBlog.mock.calls[0][0].title).toBe('new blog')
	expect(createdBlog.mock.calls[0][0].url).toBe('https://fullstackopen.com/en/part5/testing_react_apps')
})
