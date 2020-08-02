import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {addExperience} from '../../redux/profile/profileAction'
import {connect} from 'react-redux'

const AddExperience = (props) => {

    const [formData, setFormData] =  useState({
        title: '',
        company: '',
        location: '',
        from: '',
        current: false,
        to: '',
        description: ''
    })

    const [disableTo, setDisableTo] = useState(false)

    const {title,company,location,from,current,to,description} = formData

    const handleOnChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        props.addExperience(formData,props.history)
    }

    const handleCurentCheckbox = (e)=>{
        setDisableTo(!disableTo)
        e.preventDefault();
    }
    return (
        <div>
            <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" value= {title} onChange={e=>handleOnChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company"  value= {company} onChange={e=>handleOnChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location"  value= {location} onChange={e=>handleOnChange(e)} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from"  value= {from} onChange={e=>handleOnChange(e)} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current"  value= {current} onChange={e=>handleCurentCheckbox(e)}  /> Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to"  disabled={disableTo} value= {to} onChange={e=>handleOnChange(e)} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value= {description} onChange={e=>handleOnChange(e)} 
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        addExperience: (formData, history)=>dispatch(addExperience(formData,history))
    }
}

export default connect(null,mapDispatchToProps)(withRouter(AddExperience))
