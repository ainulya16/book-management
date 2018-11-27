import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import Card from '../../../components/Card';


export default class Login extends React.Component{
  constructor(props){
    super(props)
  }
  deleteOffice = (id) =>{
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.removeOffice(id)
        },
        {
          label: 'No',
        }
      ]
    })
  }

  render(){
    return(
      <div className="container text-left">
        <div className="card">
          <div className="card-header bg-white">
            {/* <h2 className="card-title">{data.name}</h2> */}
          </div>
          <div className="card-body">
            <b className="text-left">Address</b>
            {/* <p className="card-text">{data.address}</p> */}
            <b className="text-left">Revenue</b>
            {/* <p className="card-text">{data.revenue}</p> */}

            <div className="d-flex flex-row justify-content-between">
              <div>
                <b className="text-left">Phone</b>
                {/* <p className="card-text">{data.phone}</p> */}
              </div>
              {/* <button className="btn btn-primary" onClick={this.back}>Back to overview</button> */}
            </div>
              
          </div>

          <div className="card-footer bg-white">
            <h2 className="text-left mb-3">Offices</h2>
            <div className="row row-wrap">
            {/* {offices.length>0?this.renderOffices():this.renderEmpty()} */}
            </div>
          </div>

        </div>
      </div>
    )
  }
}