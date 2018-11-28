import React from 'react'
import ReactiveFrom from '../../../../../components/ReactiveForm'

const FORM = {
  name:{
      type:'string',
      options:{
        required:true,
        label:"Nama Buku"
      }
  },
  description:{
      type:'string',
      options:{
        required:false,
        label:"Deskripsi"
      }
  },
}
export default class CustomInsertModal extends React.Component {

  render() {
    const {
      onModalClose,
      onSave,
    } = this.props;
    return (
      <div className='modal-content'>
        <div className="modal-header">
          <h5 className="modal-title">Modal title</h5>
          <button type="button" className="close" onClick={onModalClose} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <ReactiveFrom ref='form' showSubmitButton submitButtonText="Simpan" control={FORM} onSubmit={onSave}/>
        </div>
        {/* <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onModalClose}>Close</button>
          <button type="button" className="btn btn-primary">Save changes</button>
        </div> */}
      </div>
    );
  }
}
