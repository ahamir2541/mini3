import React, { Component } from 'react';

class MyFormFields extends Component {

    state = {
        btn : false
    }

     renderFields = () => {
        const formArray = []

        for(let elementName in this.props.formData){
            formArray.push({
                id : elementName,
                settings : this.props.formData[elementName]
            })
        }
        
        return formArray.map((item, i) => {
            return (
                <div key={i}>
                    {this.renderTemplates(item)}
                </div>
            )
        })
        
    }

     showLabel = (show, label) => {
        return show ? 
            <label> {label} </label>
            : 
            null
    }

     changHandler = (event,id,blur) => {
        const newState = this.props.formData
        newState[id].value = event.target.value

        if(blur){
            let validData = this.validate(newState[id])
            newState[id].valid = validData[0]
            newState[id].validationMessage = validData[1]
        }
        newState[id].touched = blur

        this.props.change(newState)
        
    }

     validate = (element) => {
        // console.log(element)
        let error = [true, '']

        if(element.validation.minLen){
            const valid = element.value.length >= element.validation.minLen
            const message = `${ !valid ? 'Must be grater than ' + element.validation.minLen : '' }`
            error = !valid ? [valid, message] : error
            
        }

        if(element.validation.required){
            const valid = element.value.trim() !== ''
            const message = `${ !valid ? 'This field is required' : '' }`

            error = !valid ? [valid, message] : error
        }

        return error
    }

     showValidation = (data) => {
        let errorMessage = null

        if(data.validation && !data.valid){

            
            
            errorMessage = (
                <div style={{
                    color : 'red',
                    fontSize : '17px',
                    fontWeight : 'bold'
                }}>
                    {data.validationMessage}
                </div>
            )
        }
        
       return errorMessage
    }

     renderTemplates = (data) => {
        let formTemplate = ''
        let values = data.settings
        
        switch(values.element){
            case('input') : 
                formTemplate = (
                    <div>
                        <h6 className="text-danger">{this.showLabel(values.label, values.labelText)} </h6>
                        <input 
                        value={values.value}
                        onBlur={ 
                            (event) => this.changHandler(event,data.id,true) 
                        }
                        onChange={ 
                            (event) => this.changHandler(event,data.id,false) 
                        }
                        style={{
                            margin : '10px 0px'
                        }} className="form-control" {...values.config} />
                        {this.showValidation(values)}
                    </div>
                )
            break
            case('textarea') : 
                formTemplate = (
                    <div>
                        <h6 className="text-danger">{this.showLabel(values.label, values.labelText)} </h6>
                        <textarea 
                        className="form-control" 
                        {...values.config}
                        value={values.value}
                        onChange={ 
                            (event) => this.changHandler(event,data.id) 
                        } ></textarea>
                    </div>
                )
            break
            case('select') : 
                formTemplate = (
                    <div>
                        <h6 className="text-danger">{this.showLabel(values.label, values.labelText)} </h6>
                        <select 
                        className="form-control"
                        name={values.config.name}
                        value={values.value}
                        onChange={ 
                            (event) => this.changHandler(event,data.id) 
                        } >
                            {
                            values.config.options.map((item, i) => (
                                <option key={i} value={item.val}>
                                    {item.text}
                                </option>
                            ))
                            }
                        </select>
                    </div>
                )
            break
            default :
                formTemplate = ''
        }

        return formTemplate
        
    }

    render() {
        return (
            <div>
                {this.renderFields()}
                <button className={`${this.state.btn ? 'btnActive' : ''}`}>Submit</button>
            </div>
        );
    }
}

export default MyFormFields;
