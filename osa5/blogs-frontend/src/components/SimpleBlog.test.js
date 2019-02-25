import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { prettyDOM } from 'dom-testing-library'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const component = render(<SimpleBlog blog={singleBlog} onClick={() => {}} />)

  const renderedBlog = component.container.querySelector('.blog')

  expect(renderedBlog).toHaveTextContent(
    'Devs, You Have Unit Testing All Wrong'
  )
  expect(renderedBlog).toHaveTextContent('Fernanda Sesto')
  expect(renderedBlog).toHaveTextContent('blog has 5 likes')
})

test('clicking like button once calls event handler once', async () => {
  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={singleBlog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(1)
})

test('clicking like button twice calls event handler twice', async () => {
  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={singleBlog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})

const singleBlog = {
  title: 'Devs, You Have Unit Testing All Wrong',
  author: 'Fernanda Sesto',
  url:
    'https://abstracta.us/blog/software-testing/devs-you-have-unit-testing-all-wrong/',
  likes: 5
}
