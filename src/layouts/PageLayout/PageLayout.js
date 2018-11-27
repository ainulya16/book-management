import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = (props) => {
  console.log(props)
  return (
    <div style={{ height: '100%' }}>

    {/* <div className='page-layout__viewport'> */}
      {props.children}
    {/* </div> */}
    </div>
  )
}
  
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
