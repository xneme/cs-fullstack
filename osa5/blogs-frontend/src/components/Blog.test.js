import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { prettyDOM } from 'dom-testing-library'
import Blog from './Blog'

test('renders content', () => {
  const component = render(<Blog blog={singleBlog} />)

  const renderedBlog = component.container.querySelector('.blog')

  expect(renderedBlog).toHaveTextContent(
    'Devs, You Have Unit Testing All Wrong'
  )
  expect(renderedBlog).toHaveTextContent('Fernanda Sesto')
})

test('by default shows only title and author, clicking shows all info', async () => {
  const component = render(<Blog blog={singleBlog} user={user} />)

  const renderedBlog = component.container.querySelector('.blog')

  expect(renderedBlog).toHaveTextContent(
    'Devs, You Have Unit Testing All Wrong'
  )
  expect(renderedBlog).toHaveTextContent('Fernanda Sesto')
  expect(renderedBlog).not.toHaveTextContent('5 likes')
  expect(renderedBlog).not.toHaveTextContent(singleBlog.url)

  fireEvent.click(renderedBlog)

  expect(renderedBlog).toHaveTextContent('5 likes')
  expect(renderedBlog).toHaveTextContent(singleBlog.url)
})

const user = {
  username: 'root',
  name: 'Superuser'
}

const singleBlog = {
  title: 'Devs, You Have Unit Testing All Wrong',
  author: 'Fernanda Sesto',
  url:
    'https://abstracta.us/blog/software-testing/devs-you-have-unit-testing-all-wrong/',
  likes: 5,
  user: user
}
