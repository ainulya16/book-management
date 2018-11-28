import React, { Component } from 'react';
import { connect } from 'react-redux'
import { get_book_list, delete_book, create_book } from '../modules/book'
import { BootstrapTable, TableHeaderColumn, InsertModalFooter } from 'react-bootstrap-table';
import { confirmAlert } from 'react-confirm-alert'
import CustomInsertModal from '../components/AddBook';

class Book extends Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.props.get_book_list()
  }
  handleConfirmDeleteRow = (next, dropRowKeys) =>{
    confirmAlert({
      title: `Hapus ${dropRowKeys.length} buku`,
      message: 'Hapus sekarang?',
      buttons: [
        {
          label: 'Ya',
          onClick: () => {
            this.props.delete_book(dropRowKeys)
            next()
          }
        },
        {
          label: 'Batalkan',
        }
      ]
    })
  }
  save = value =>{
    this.props.create_book(value).then(value=>console.log(value))
  }
  createCustomModal = (onModalClose) => {
    const attr = {
      onModalClose
    };
    return <CustomInsertModal { ... attr } onSave={this.save}/>
  }

  render(){
    const { books } = this.props
    const options = {
      handleConfirmDeleteRow: this.handleConfirmDeleteRow,
      insertModal: this.createCustomModal,
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
          <BootstrapTable remote ref='table' data={books} striped hover insertRow deleteRow selectRow={selectRowProp} options={ options }>
              <TableHeaderColumn isKey dataField='id' editable={false} hidden>ID</TableHeaderColumn>
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
  delete_book,
  create_book
}

const mapStateToProps = (state) => ({
  ...state.book
})


export default connect(mapStateToProps, mapDispatchToProps)(Book)
