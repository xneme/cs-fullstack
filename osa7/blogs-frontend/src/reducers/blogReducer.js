import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data.sort((a, b) => b.likes - a.likes)
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE_BLOG':
    return state
      .map((blog) => (blog.id !== action.data.id ? blog : action.data))
      .sort((a, b) => b.likes - a.likes)
  case 'REMOVE_BLOG':
    return state.filter((blog) => blog.id !== action.data)
  default:
    return state
  }
}

export const initializeBlogsAction = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlogAction = (newBlog) => {
  return async (dispatch) => {
    const savedBlog = await blogService.create(newBlog)
    dispatch({
      type: 'NEW_BLOG',
      data: savedBlog
    })
  }
}

export const likeBlogAction = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1
    })
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const removeBlogAction = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)

    dispatch({
      type: 'REMOVE_BLOG',
      data: blog.id
    })
  }
}

export default reducer
