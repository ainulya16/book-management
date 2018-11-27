import React from 'react'

export default class Form extends React.Component{
    resetForm(){
        const { form } = this.props
        let keys = Object.keys(form)
        keys.forEach(field=>{
            let { inputs } = form[field]
            if(!inputs) inputs = [{name:field}]
            inputs.forEach(inputName=>{
                this.refs[inputName.name].value = ''
            })
        })
    }
    displayError(field){
        let { inputs } = this.props.form[field]
        if(!inputs) inputs = [{name:field}]
        inputs.forEach(item=>{
            if(this.refs[item.name]) this.refs[item.name].className +=' is-invalid'
        })
        if(this.refs[`${field}-message`]) this.refs[`${field}-message`].hidden = false
    }
    hideError(field){
        let { inputs } = this.props.form[field]
        if(!inputs) inputs = [{name:field}]
        inputs.forEach(item=>{
            if(this.refs[item.name]) this.refs[item.name].className = this.refs[item.name].className.replace(/is-invalid/g,'')
        })
        if(this.refs[`${field}-message`]) this.refs[`${field}-message`].hidden = true
    }
    get_value(){
        const { form } = this.props
        let keys = Object.keys(form)
        let value = {}
        keys.forEach(field=>{
            let { inputs, join='' } = form[field]
            /// if 1 parameter using multiple input fields
            value[field] = inputs ? inputs.map(input=>{
                return this.refs[input.name].value
            }) : [this.refs[field].value]
            if(value[field].filter(val=>val==''||val==' '||val==undefined).length==0){
                this.hideError(field)
                value[field] = value[field].join(join)
            }else{
                this.displayError(field)
                value[field] = null
            }

        })
        let validators = Object.values(value).filter(item=>item==null)
        if(validators.length==0){
            this.resetForm()
            return value
        }
    }
    renderInput(input,att){
        const { name, className } = input
        const { type, options } = att
        switch (type) {
            case 'select':
                return (
                    <select key={name} ref={name} className={`custom-select ${className}`}defaultValue='' >
                        <option value='' key={0}>{`Select ${name}`}</option>
                        {options.map((item,i)=><option key={i+1} value={item.value}>{item.label}</option>)}
                    </select>
                )
        
            default:
                return <input key={name} type={type} ref={name} className={`form-control mr-3 ${className}`} placeholder={name}/>
        }
    }
    render_field(fieldName, att){    
        let { label, inputs } = att
        if(!inputs) inputs = [{name:fieldName}]
        let labelText = label ? label : fieldName.split('_').map(string=>string.charAt(0).toUpperCase() + string.slice(1)).join(' ')
        return (
            <div className="form-group text-left" key={fieldName}>
                <label>{labelText}</label>
                    <div className="d-flex flex-row">
                        {inputs.map(inputName=>this.renderInput(inputName, att))}
                    </div>
                <small ref={`${fieldName}-message`} hidden className="form-text text-danger">Please enter {labelText}</small>
            </div>
        )
    }
    
    render_form(){
        const { form } = this.props
        let keys = Object.keys(form)
        return keys.map(item=>{
            return this.render_field(item, form[item])
        })
    }
    render(){
        return(
            <div>
                <form>
                {this.render_form()}
                </form>
            </div>
        )
    }
}