
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signin extends Component {

    handleFormSubmit( { email, password } ) {
        this.props.signinUser({ email, password });
    }

    renderAlert(){
        if(this.props.errorMessage){
            return (<div className="alert alert-danger">
                <strong>Oops! </strong>{this.props.errorMessage}
            </div>)
        }
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <Field 
                        name="email" 
                        type="email" 
                        component="input" 
                        className="form-control"
                    />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <Field 
                        name="password" 
                        type="password"
                        component="input" 
                        className="form-control" 
                    />
                </fieldset>
                { this.renderAlert() }
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        )
        /* <fieldset className='form-group'>
            <label>Email: </label>
            <input {...email} className="form-control" />
        </fieldset>
        <fieldset className='form-group'>
            <label>Password: </label>
            <input {...password} className="form-control" />
        </fieldset>
        <button action="submit" className="btn btn-primary">Sign in</button> */
    }
}

// arguments: form dets, map state to props, map dispatch to props
// export default reduxForm({
//     form: 'signin',
//     fields: ['email', 'password']
// }, null, actions)(Signin);

function mapStateToProps(state){
    return {
        errorMessage: state.auth.error
    }
}

Signin = connect(mapStateToProps, actions)(Signin)
Signin = reduxForm({
    form: 'Signin'
 })(Signin);
export default Signin;
