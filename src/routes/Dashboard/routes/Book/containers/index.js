import React, { Component } from 'react';
import { connect } from 'react-redux'
import { get_book_list, delete_book } from '../modules/book'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import { confirmAlert } from 'react-confirm-alert'

class Book extends Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.props.get_book_list()
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

  onAfterInsertRow = (row) => {
    console.log(row)
  }
  onAfterDeleteRow = (rowKeys) =>{
    console.log(rowKeys)
    this.props.delete_book(rowKeys)
  }
  
  
  render(){
    const { books } = this.props
    const options = {
      afterInsertRow: this.onAfterInsertRow,  // A hook for after insert rows
      afterDeleteRow: this.onAfterDeleteRow  // A hook for after droping rows.
    }
    const selectRowProp = {
      mode: 'checkbox'
    };
    return(
      <div className="container text-left mt-4">
      <div className="row">

        <div className="col-2">
          <h1>Book</h1>
        </div>

        <div className="col-10">
          <BootstrapTable data={books} striped hover insertRow deleteRow selectRow={selectRowProp} options={ options }>
              <TableHeaderColumn isKey dataField='id' hidden hiddenOnInsert>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='name'>Nama</TableHeaderColumn>
              <TableHeaderColumn dataField='description'>Deskripsi</TableHeaderColumn>
          </BootstrapTable>
        </div>

        </div>
      </div>
    )
  }
}
const mapDispatchToProps = {
  get_book_list,
  delete_book
}

const mapStateToProps = (state) => ({
  ...state.book
})


export default connect(mapStateToProps, mapDispatchToProps)(Book)
