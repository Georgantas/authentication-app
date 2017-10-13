
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

// errors (cannot submit)
const required = value => value ? undefined : 'Required'
const email = value =>
value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
'Invalid email address' : undefined
const matches = (value, allValues) => allValues && allValues.confirmPass != allValues.password ? 'Passwords do not match' : undefined

// warnings (can still submit)
const aol = value =>
value && /.+@aol\.com/.test(value) ?
'Really? You still use AOL for your email?' : undefined

const renderField = ({ input, label, type, className, meta: { touched, error, warning } }) => (
    <div className="form-group">    
        <label>{label}</label>
        <input {...input} type={type} className={className} /> 
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  )

class Signup extends Component {
    onSubmit(formProps){
        // Call action creator to sign up user!
        this.props.signupUser(formProps);
    }

    renderAlert() {
        if(this.props.errorMessage){
            return (
                <div className='alert alert-danger'>
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }

    render() {
        const { handleSubmit, pristine, submitting, reset } = this.props;

        return (
            <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                    <Field
                        name="email" 
                        type="email" 
                        component={renderField}
                        label="E-mail:"
                        validate={[email, required]}
                        warn={aol}
                        className="form-control"
                    />
                    <Field
                        name="password" 
                        type="password"
                        component={renderField}
                        label="Password:"
                        validate={required}
                        className="form-control" 
                    />
                    <Field 
                        name="confirmPass" 
                        type="password"
                        component={renderField}
                        label="Confirm Password:"
                        validate={[required, matches]}
                        className="form-control" 
                    />
                    {this.renderAlert()}
                <button action="submit" disabled={submitting} className="btn btn-primary">Sign up</button>
            </form>
        )
    }
}

function mapStateToProps(state){
    return { errorMessage: state.auth.error }
}

export default reduxForm({
    form: 'Signup'
})(connect(mapStateToProps, actions)(Signup));
