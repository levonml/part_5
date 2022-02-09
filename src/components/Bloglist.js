import React from 'react'
import Blog from './Blog'
import { useState } from 'react'

const handleLogout = () => {
  window.localStorage.clear()
}
const Bloglist = ({ user, blogs }) => {
  const [bl, setBolg] = useState(blogs)
  const refreshBlogs = (el) => setBolg(el)
  return (
    <div>
      <form onSubmit={handleLogout}>
        <div>{user.username} logged-in</div>
        <div>
          <button type="submit" onClick={handleLogout}>
						log out
          </button>
        </div>
      </form>

      <div>
        <h2>blogs</h2>

        {bl
          .sort((a, b) => Number(b.likes) - Number(a.likes))
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              setBlogsForParent={refreshBlogs}
              user={user}
            />
          ))}
      </div>
    </div>
  )
}
export default Bloglist
