import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <List divided relaxed id="blogList">
        {blogs.map((blog) => (
          <List.Item key={blog.id}>
            <List.Content>
              <List.Header>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Link>
              </List.Header>
              <List.Description>{blog.likes} likes</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps)(BlogList)
