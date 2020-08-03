import React, { Fragment, useState } from 'react'
import {setupAlert} from '../../redux/alert/alertAction'
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { register } from '../../redux/auth/authActions'

const Signup = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''

    })

    const {name, email, password, password2} = formData

    

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async e => {
        e.preventDefault()
        console.log('On Submit')
        if(password !== password2){
            console.log('password dint match');
            props.setupAlert('Passwords dont match', 'danger',1000)
            return 
        }

        props.register(name,email,password);

        // try{
        //     const user = {
        //         name,
        //         email,
        //         password
        //     }

        //     const config = {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }

        //     const body = JSON.stringify(user)

        //     const resp = await axios.post('api/users/save', body, config)

        //     console.log(resp.data)
        // }catch(err){
        //     console.error(err)
        // }
    }

    //if Logged in already, redirect to dashboard
    if(props.isAuthenticated){ 
      return <Redirect to="/dashboard" />
    }


    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e=> onSubmit(e)}>
        <div className="form-group">
          <input type="text" 
            placeholder="Name" 
            name="name" 
            required 
            value = {name}
             onChange = {e => handleOnChange(e)}/>
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange = {e => handleOnChange(e)}/>
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange = {e => handleOnChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange = {e => handleOnChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register"/>
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setupAlert: (msg,alertType,timeout) => dispatch(setupAlert(msg,alertType,timeout)),
        register: (name,email,password) => dispatch(register(name,email,password))
    }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (Signup)
