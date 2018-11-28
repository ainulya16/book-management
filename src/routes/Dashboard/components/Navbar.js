import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import { logout } from '../../Login/modules/auth'

class Navbar extends React.Component{
    constructor(props){
        super(props)
    }
    logout = () =>{
        confirmAlert({
            title: 'Logout Sekarang',
            message: 'Keluar sekarang?',
            buttons: [
                {
                label: 'Ya',
                    onClick: () => this.props.logout()
                },
                {
                label: 'Tidak',
                }
            ]
        })
    }
    render(){
        const { pathname } = this.props.location
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

                <a className="navbar-brand" href="#">Mak Gede Book</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className={`nav-item ${pathname=='/book'&&'active'}`}>
                        <a className="nav-link" href="/book">Book</a>
                        </li>
                        <li className={`nav-item ${pathname=='/profile'&&'active'}`}>
                        <a className="nav-link" href="/profile">Profile</a>
                        </li>
                    </ul>
                    <div className="nav-item">
                        <a className="nav-link btn" onClick={this.logout}>Logout</a>
                    </div>
                </div>

            </nav>
        )
    }
} 
const mapStateToProps = state =>({...state})
const mapDispatchToProps = {
    logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)