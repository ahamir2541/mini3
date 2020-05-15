import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import MyFormFields from './MyFormFields'

class MyForm extends Component {

    state = {
        btn : false,
        formData: {
            name: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Name',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name',
                },
                validation: {
                    required: true,
                    minLen: 5,
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            lastname : {
                element : 'input',
                value : '',
                label : true,
                labelText : 'Lastname',
                config : {
                    name : 'Lastname_input',
                    type : 'text',
                    placeholder : 'Enter your Lastname',
                },
                validation : {
                    required : true,
                    minLen : 5,
                },
                valid : false,
                touched : false,
                validationMessage : ''
            },
            message : {
                element : 'textarea',
                value : '',
                label : true,
                labelText : 'Message',
                config : {
                    name : 'Message_input',
                    rows : 4,
                    cols : 36,
                },
                validation : {
                    required : false,
                },
                valid : true,
            },
            age : {
                element : 'select',
                value : '',
                label : true,
                labelText : 'Age',
                config : {
                    name : 'Age_input',
                    options : [
                        {val : '1', text : '10-20'},
                        {val : '2', text : '20-30'},
                        {val : '3', text : '30+'},
                    ]
                },
                validation : {
                    required : false,
                },
                valid : true,
            },

        }
    }

    updateForm = (newState) => {
        this.setState({
            formData : newState
        })
    }

    submitForm = (event) => {
        event.preventDefault()
        let DataToSubmit = {}
        let formIsValid = true

        for(let key in this.state.formData){
            formIsValid = this.state.formData[key].valid && formIsValid
        }

        for(let key in this.state.formData){
            DataToSubmit[key] = this.state.formData[key].value
        }

        if(formIsValid){
            console.log(DataToSubmit)
        }

    }

    render() {
        // console.log(this.state.btn)
        return (
            <div>
                <Container>
                    <form onSubmit={this.submitForm}>
                        <MyFormFields 
                        formData={this.state.formData}
                        change={ (newState) => this.updateForm(newState) } 
                        onblur={ (newState) => this.updateForm(newState) } />
                        
                    </form>
                </Container>
            </div>
        );
    }
}

export default MyForm;