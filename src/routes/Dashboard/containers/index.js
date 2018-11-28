import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import { authenticate } from '../../Login/modules/auth'

class EnsureLoggedInContainer extends Component {
  componentDidMount() {
    const { currentURL } = this.props
    this.props.authenticate(currentURL)
  }

  render() {
      return (
        <div>
          <Navbar/>
          <div className="container">
            {this.props.children}
          </div>
        </div>
      )
  }
}

const mapStateToProps = (state, ownProps)=> {
  return {
    currentURL: ownProps.location.pathname
  }
}
const mapDispatchToProps = {
  authenticate
}

export default connect(mapStateToProps,mapDispatchToProps)(EnsureLoggedInContainer)