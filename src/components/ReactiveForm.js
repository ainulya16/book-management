import React, { Component } from 'react';
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
 } from "react-reactive-form";

const TextInput = ({ handler, touched, hasError, meta }) => (
    <div className="form-group text-left">
                <label>{meta.label}</label>
                    <div className="d-flex flex-row">
                        <input placeholder={`Enter ${meta.label}`} type={meta.type} className="form-control" {...handler()}/>
                    </div>
                <small className="form-text text-danger">{touched
        && hasError("required")
        && `${meta.label} is required`}</small>
    </div>
)
export default class ReactiveForm extends Component {
    form = FormBuilder.group({})
    constructor(props){
        super(props)
        this.get_form()
    }
    get_form(){
        const { control } = this.props
        let group = Object.keys(control).reduce((obj, item) => {
            const { options, value } = control[item]

            obj[item] = [value ? value : "", options.required && Validators.required]
            return obj
        }, {})

        this.form = FormBuilder.group(group);
    }
    reset=() => {
        this.form.reset();
    }
    get_value(){
        return this.form.value
    }
    submit=(e) => {
        e.preventDefault();
        let {value} = this.form
        this.props.onSubmit && this.props.onSubmit(value)
    }
    renderFormControl(field){
        const { options } = this.props.control[field]
        return <FieldControl
            key={field}
            name={field}
            render={TextInput}
            meta={options}
        />
    }
    render() {
        const { control, showResetButton, showSubmitButton, submitButtonText='Submit' } = this.props
        return (
              <FieldGroup
                control={this.form}
                render={({ get, invalid }) => (
                  <form onSubmit={this.submit}>

                    {Object.keys(control).map(field=>this.renderFormControl(field))}
                    
                    {showResetButton&&<button
                      type="button"
                      className="btn btn-warning mr-3"
                      onClick={this.reset}
                    >
                      Reset
                    </button>}

                    {showSubmitButton&&<button
                      type="submit"
                      disabled={invalid}
                      className="btn btn-primary"
                    >
                      {submitButtonText}
                    </button>}
                  </form>
                )}
              />
        );
    }
}