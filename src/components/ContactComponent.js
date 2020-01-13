import React from 'react';
import {Breadcrumb, BreadcrumbItem, Button,  Form, FormGroup, Label, Input, Col, Row, FormFeedback} from 'reactstrap'
import {Link} from 'react-router-dom'

export default class Contact extends React.Component {
    state={
        firstname: '',
        lastname: '',
        telnum: '',
        email: '',
        agree: false,
        contactType: 'Tel.',
        message: '',
        touched: {
            fisrtname: false,
            lastname: false,
            telnum: false,
            email: false
        }
    }


    handleInputChange = event => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }

    handleBlur = field => event => {
        this.setState({
            touched:{...this.state.touched, [field]: true}
        })
    }

    validate = (firstname, lastname, telnum, email) => {
        const errors={
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
        }

        if(this.state.touched.firstname && firstname.length< 3){
            errors.firstname = 'First name should be greater than 3'
        }

        if(this.state.touched.lastname && lastname.length < 3){
            errors.lastname = 'Last name should be greater than 3'
        }

        const reg= /^\d+$/

        if(this.state.touched.telnum && telnum.length !== 10 && !reg.test(telnum)){
            errors.telnum = 'Tel num shoud have 10 numbers'
        }

        if(this.state.touched.email && email.split('').filter(x => x === '@').length !== 1){
            errors.email = 'Please, enter a valid email'
        }

        return errors
        
        
    }
    handleSubmit = event => {
        console.log('Current state is:' + JSON.stringify(this.state))
        alert('Current state is:' + JSON.stringify(this.state))
        event.preventDefault()
    }

    render(){
        const errors = this.validate(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email)
    return(
        <div className="container">
        <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home' >Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Contact us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Menu</h3>
                    <hr/>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Send us your feedback</h3>
                </div>
                <div className="col-12 col-md-9">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label htmlFor='firstname' md={2}>First Name</Label>
                            <Col md={10}>
                                <Input valid={errors.firstname === ''} invalid={errors.firstname !== ''} onChange={this.handleInputChange} onBlur={this.handleBlur('firstname')} type='text' id='fistname' name='firstname' placeholder='First Name' value={this.state.firstname}/>
                                <FormFeedback>{errors.firstname}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor='lastname' md={2}>Last Name</Label>
                            <Col md={10}>
                                <Input valid={errors.lastname === ''} invalid={errors.lastname !== ''} onChange={this.handleInputChange} onBlur={this.handleBlur('lastname')} type='text' id='lastname' name='lastname' placeholder='Last Name' value={this.state.lastname}/>
                                <FormFeedback>{errors.lastname}</FormFeedback>

                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor='telnum' md={2}>Contact Tel.</Label>
                            <Col md={10}>
                                <Input valid={errors.telnum === ''} invalid={errors.telnum !== ''} onChange={this.handleInputChange} onBlur={this.handleBlur('telnum')} type='tel' id='telnum' name='telnum' placeholder='Tel. Number' value={this.state.telnum}/>
                                <FormFeedback>{errors.telnum}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor='email' md={2}>Email</Label>
                            <Col md={10}>
                                <Input valid={errors.email === ''} invalid={errors.email !== ''} onChange={this.handleInputChange} onBlur={this.handleBlur('email')} type='email' id='email' name='email' placeholder='Email' value={this.state.email}/>
                                <FormFeedback>{errors.email}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{size: 6, offset: 2}}>
                                <FormGroup check>
                                    <Label check>
                                        <Input onChange={this.handleInputChange} type='checkbox' name='agree' checked={this.state.agree} /> {' '}
                                        <strong>May we contact you?</strong>
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col md={{size: 3, offset: 1}}>
                                <Input onChange={this.handleInputChange} type='select' name='contactType' value={this.state.contactType}>
                                    <option>Tel.</option>
                                    <option>Email</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor='message' md={2}>Your Feedback</Label>
                            <Col md={10}>
                                <Input onChange={this.handleInputChange} type='textarea' id='message' name='message' rows='12' value={this.state.message}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{size:10, offset:2}}>
                                <Button type='submit' color='primary'>Send Feedback</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </div>
    );}
}

