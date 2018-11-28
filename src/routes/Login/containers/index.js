import React, { Component } from 'react';
import { connect } from 'react-redux'
import Form from '../../../components/Form'
import { login } from '../modules/auth'

// import { confirmAlert } from 'react-confirm-alert'

const FORM = {
  username:{
      type:'text',
  },
  password:{
      type:'text',
  },
}
class Login extends Component{
  constructor(props){
    super(props)
  }

  login = () =>{
    let value = this.refs.form.get_value()
    if(value){
        this.props.login(value)
    }
  }

  render(){
    return(
      <div className="row h-100 justify-content-center align-items-center">
        <div className="container text-center align-items-center">
          <div className="col-6 offset-3">
            <Form ref='form' form={FORM}/>
            <button type="button" className="btn btn-primary" onClick={this.login}>Login</button>
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
