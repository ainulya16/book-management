import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { confirmAlert } from 'react-confirm-alert'

class Profile extends Component{
  constructor(props){
    super(props)
  }
  // deleteOffice = (id) =>{
  //   confirmAlert({
  //     title: 'Confirm to delete',
  //     message: 'Are you sure to do this.',
  //     buttons: [
  //       {
  //         label: 'Yes',
  //         onClick: () => this.props.removeOffice(id)
  //       },
  //       {
  //         label: 'No',
  //       }
  //     ]
  //   })
  // }

  render(){
    return(
      <div className="container text-left">
      <h1>Profile</h1>
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


export default connect(mapStateToProps, mapDispatchToProps)(Profile)
