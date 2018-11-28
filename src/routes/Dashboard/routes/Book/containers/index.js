import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get_book_list, delete_book, create_book, update_book } from '../modules/book'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { confirmAlert } from 'react-confirm-alert'
import CustomInsertModal from '../components/AddBook'
import FieldEditor from '../components/FieldEditor'
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
  save = (value, callback) =>{
    this.props.create_book(value).then(value=>callback(value))
  }
  update = (data, callback) =>{
    if(data){
      confirmAlert({
        title: `Perbarui buku`,
        message: 'Perbarui sekarang?',
        buttons: [
          {
            label: 'Ya',
            onClick: () => this.props.update_book(data).then(val=>callback(val))
          },
          {
            label: 'Batalkan',
          }
        ]
      })
    }
    callback()
    
  }
  createCustomModal = (onModalClose,onSave) => {
    const attr = {
      onModalClose
    };
    return <CustomInsertModal { ... attr } onSave={(val)=>this.save(val,onSave)}/>
  }
  
  render(){
    const { books } = this.props
    
    const cellEditProp = {
      mode: 'click',
    };
    const options = {
      handleConfirmDeleteRow: this.handleConfirmDeleteRow,
      insertModal: this.createCustomModal,
    }
    const selectRowProp = {
      mode: 'checkbox'
    };

    const createNameEditor = (onUpdate, props, field) => (<FieldEditor onUpdate={val=> this.update(val,onUpdate) } {...props} field={field}/>);
    return(
      <div className="container text-left my-4">
      <div className="row">

        <div className="col-2">
          <h1>Book</h1>
        </div>

        <div className="col-10">
          <BootstrapTable remote ref='table' data={books} cellEdit={cellEditProp} striped hover insertRow deleteRow selectRow={selectRowProp} options={ options }>
              <TableHeaderColumn isKey dataField='id' editable={false} hidden>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='name' customEditor={ { getElement:(onUpdate, props)=> createNameEditor(onUpdate, props,'name') } }>Nama</TableHeaderColumn>
              <TableHeaderColumn dataField='description' customEditor={ { getElement:(onUpdate, props)=> createNameEditor(onUpdate, props,'description') } }>Deskripsi</TableHeaderColumn>
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
  create_book,
  update_book,
}

const mapStateToProps = (state) => ({
  ...state.book,
})


export default connect(mapStateToProps, mapDispatchToProps)(Book)
