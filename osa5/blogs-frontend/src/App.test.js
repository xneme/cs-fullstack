import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('only shows login form if user not logged in', async () => {
    const component = render(<App />)

    component.rerender(<App />)

    await waitForElement(() => component.container.querySelector('.loginForm'))

    expect(component.container).toHaveTextContent('Log in to application')
  })

  it('shows all blogs if user logged in', async () => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(<App />)

    component.rerender(<App />)

    await waitForElement(() => component.container.querySelector('.blog'))
    expect(component.container).not.toHaveTextContent('Log in to application')

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(4)

    expect(component.container).toHaveTextContent(
      'From 1,000,000 to Graham\'s Number'
    )
    expect(component.container).toHaveTextContent(
      'Neuralink and the Brain’s Magical Future'
    )
    expect(component.container).toHaveTextContent(
      'How to Pick a Career (That Actually Fits You)'
    )
    expect(component.container).toHaveTextContent(
      'Things I Don’t Know as of 2018'
    )
  })
})

const user = {
  username: 'tester',
  token: '1231231214',
  name: 'Teuvo Testaaja'
}
