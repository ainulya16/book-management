import React, { Component } from 'react';
import { connect } from 'react-redux'
import { get_user_profile } from '../modules/profile'

class Profile extends Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.props.get_user_profile()
  }

  render(){
    const { user } = this.props.profile
    return(
      <div className="container text-left mt-4">
      <div className="row">

        <div className="col-4">
          <h1>Profile</h1>
        </div>
        
        <div className="col-8">
          <div className="card">
            <div className="card-body">
              <label>Fullname</label>
              <h5 className="card-title">{user.fullname}</h5>
              <label>Username</label>
              <h5 className="card-title">{user.username}</h5>
              <label>ID</label>
              <h5 className="card-title">{user.id}</h5>
            </div>
          </div>
        </div>

      </div>
      </div>
    )
  }
}
const mapDispatchToProps = {
  get_user_profile,
}

const mapStateToProps = (state) => ({
  ...state
})


export default connect(mapStateToProps, mapDispatchToProps)(Profile)
