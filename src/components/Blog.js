import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, setBlogsForParent }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const buttonStyle = {
    margin: 10,
    background: 'white',
    borderRadius: 5,
  }
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const showDetails = () => setVisible(true)
  const hideDetails = () => setVisible(false)

  const addLike = async () => {
    blog.likes++
    setLikes(blog.likes)
    try {
      await blogService.update(blog)
    } catch (err) {
      console.log('error from update', err)
    }
    try {
      const response = await blogService.getAll()
      console.log('response from getAll= ', response)
      setBlogsForParent(response)
    } catch (err) {
      console.log('error from dgettingAll', err)
    }
  }
  const deleteBlog = async () => {
    try {
      const response = await blogService.deleteOne(blog.id)
      console.log('response from delete = ', response)
    } catch (err) {
      console.log('error from deleteOne', err)
    }
    try {
      const response = await blogService.getAll()
      console.log('response from getAll= ', response)
      setBlogsForParent(response)
    } catch (err) {
      console.log('error from dgettingAll', err)
    }
  }
  return (
    <div style={blogStyle}>
      <div style={visible ? { display: 'none' } : { display: '' }}>
        {blog.title} {blog.author}
        <button style={buttonStyle} onClick={showDetails}>
					view
        </button>
      </div>
      <div style={visible ? { display: '' } : { display: 'none' }}>
        <div>
          {blog.title}
          <button style={buttonStyle} onClick={hideDetails}>
						hide
          </button>
        </div>
        <div>{blog.url}</div>
        <div>
					likes {likes}
          <button onClick={addLike} style={buttonStyle}>
						like
          </button>
        </div>
        <div>{blog.author}</div>

        <div
          style={{
            display: blog.user[0].userName === user.username ? '' : 'none',
          }}
        >
          <button onClick={deleteBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
