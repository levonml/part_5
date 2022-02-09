import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [showContent, setShowContent] = useState(false)

  const handleShow = () => setShowContent(!showContent)
  const buttonVisibility = { display: showContent ? 'none' : '' }
  const formVisibility = { display: showContent ? '' : 'none' }

  useImperativeHandle(ref, () => {
    return {
      handleShow,
    }
  })
  return (
    <>
      <div style={buttonVisibility}>
        <button onClick={handleShow}>{props.buttonLable}</button>
      </div>
      <div style={formVisibility}>
        {props.children}
        <button onClick={handleShow}>cancel</button>
      </div>
    </>
  )
})
Togglable.displayName = 'Togglable'
export default Togglable
