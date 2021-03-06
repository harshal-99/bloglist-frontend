import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import {prettyDOM} from '@testing-library/dom'


import Blog from "./Blog"

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        user: {username: "Michael"}
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {

        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,

    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
]

test('<Blog/> renders title and author by default', () => {

    const component = render(
        <Blog user={{}} deleteBlog={() => {
        }} blog={initialBlogs[0]}
              setBlogs={() => {
              }}/>
    )


    expect(component.container).toHaveTextContent(
        "React patterns"
    )

    expect(component.container).not.toHaveTextContent(
        "https://reactpatterns.com/"
    )
})

test('<Blog /> shows likes and url after clicking button', () => {
    const component = render(
        <Blog user={{}} deleteBlog={() => {}}
              blog={initialBlogs[0]}
              setBlogs={() => {}}
        />
    )

    const button = component.getByText('view')
    fireEvent.click(button)


    expect(component.container).toHaveTextContent(
        "https://reactpatterns.com/"
    )


    expect(component.container).toHaveTextContent(
        "likes 7"
    )
})

