import React, { Fragment, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

import PropTypes from 'prop-types';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;

    const onChange = input => { setFormData({ ...formData, [input.target.name]: input.target.value }) }

    const onSubmit = async form => {
        form.preventDefault();
        login(email, password);
    }

    //redirect if logged in
    if (isAuthenticated) {
        return <Navigate to='/dashboard' />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Sing Into Your Account</p>
            <form className="form" onSubmit={form => onSubmit(form)}>

                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email} name="email"
                        onChange={input => onChange(input)}
                        required />

                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        autoComplete="on"
                        value={password}
                        onChange={input => onChange(input)}
                    />
                </div>

                <input type="submit" className="btn btn-primary" value="Sing in" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);