import React from 'react'
import PropTypes from 'prop-types'
import './PageLayout.scss'
import { ToastContainer } from 'react-toastify'

export const PageLayout = (props) => {
  return (
    <div style={{ height: '100%' }}>
      <ToastContainer/>
      {props.children}
    </div>
  )
}
  
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
