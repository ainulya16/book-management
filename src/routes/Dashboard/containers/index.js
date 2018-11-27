import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'

class Dashboard extends Component{
  constructor(props){
    super(props)
    console.log(props)
  }

  render(){
    return(
      <div>
        <Navbar/>
        <div className="container">
        {this.props.children}
        </div>
      </div>
      
    )
  }
}
const mapDispatchToProps = {
  // removeOffice,
}

const mapStateToProps = (state) => ({
  ...state
  // companies : state.companies.data,
  // offices : state.offices.data
})


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
