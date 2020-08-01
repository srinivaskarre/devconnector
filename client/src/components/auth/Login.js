import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {login} from '../../redux/auth/authActions'

const Login = (props) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email,password} = formData

    const handleOnChange = e=> {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    onsubmit = e => {
        e.preventDefault()
        props.login(email,password)
        
    }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" action="dashboard.html">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value = {email}
            onChange = {e => handleOnChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" name="password" 
          value= {password}
          onChange = {e => handleOnChange(e)}/>
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
  login: (email,password) => dispatch(login(email,password))
  }
}

export default connect(null,mapDispatchToProps) (Login);