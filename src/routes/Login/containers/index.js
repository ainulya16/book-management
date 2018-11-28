import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactiveFrom from '../../../components/ReactiveForm'
import { login } from '../modules/auth'

const FORM = {
  username:{
      type:'string',
      options:{
        required:true,
        label:"Username"
      }
  },
  password:{
      type:'string',
      options:{
        required:true,
        label:"Password"
      }
  },
}
class Login extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="row h-100 justify-content-center align-items-center">
        <div className="container text-center align-items-center">
          <div className="col-6 offset-3">
            <ReactiveFrom ref='form' showSubmitButton submitButtonText="LOGIN" control={FORM} onSubmit={this.props.login}/>
          </div>
        </div>
        
      </div>
      

    )
  }
}
const mapDispatchToProps = {
  login
}

const mapStateToProps = (state) => ({
  ...state.auth
})


export default connect(mapStateToProps, mapDispatchToProps)(Login)
