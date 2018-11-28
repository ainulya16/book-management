import React from 'react'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = (props) => {
  return (
    <div style={{ height: '100%' }}>
      {props.children}
    </div>
  )
}
  
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
