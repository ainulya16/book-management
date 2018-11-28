import React from 'react';
export default class FieldEditor extends React.Component {
    constructor(props) {
      super(props);
      this.updateData = this.updateData.bind(this);
      this.state = {
        name: props.defaultValue,
        open: true
      };
    }
    focus() {
      this.refs.inputRef.focus();
    }
    updateData() {
      this.props.onUpdate({...this.props.row, [this.props.field]:this.state.name});
    }
    close = () => {
      this.setState({ open: false });
      this.props.onUpdate();
    }
    render() {
      return (
        // <div className={ `modal fade ${fadeIn}` } id='myModal' role='dialog' >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-body'>
                <input
                  ref='inputRef'
                  className={ ( this.props.editorClass || '') + ' form-control editor edit-text' }
                  style={ { display: 'inline', width: '50%' } }
                  type='text'
                  value={ this.state.name }
                  onChange={ e => { this.setState({ name: e.currentTarget.value }); } } />
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-primary' onClick={ this.updateData }>Save</button>
                <button type='button' className='btn btn-default' onClick={ this.close }>Close</button>
              </div>
            </div>
          </div>
        // </div>
      );
    }
  }