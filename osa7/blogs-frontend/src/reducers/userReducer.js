import blogService from '../services/blogs'
import loginService from '../services/login'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'CLEAR_USER':
    return null
  default:
    return state
  }
}

export const setUserAction = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const clearUserAction = () => {
  return async (dispatch) => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'CLEAR_USER'
    })
  }
}

export const loginUserAction = (username, password) => {
  return async (dispatch) => {
    const loggedInUser = await loginService.login({
      username,
      password
    })
    window.localStorage.setItem(
      'loggedBlogappUser',
      JSON.stringify(loggedInUser)
    )
    blogService.setToken(loggedInUser.token)
    dispatch({
      type: 'SET_USER',
      data: loggedInUser
    })
  }
}

export default reducer
