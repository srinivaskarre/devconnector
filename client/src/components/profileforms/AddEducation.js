import React, { useState } from 'react'
import { Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { addEducation } from '../../redux/profile/profileAction'

const AddEducation = (props) => {

  const [formData, setFormData] =  useState({ 
    school: '',
    degree:'',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''

  })

  const {school,degree,fieldofstudy,from,current,to,description} = formData

  const [disableTo, setDisableTo] = useState(false)

  const handleOnChange = e => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
}

const onSubmit = e => {
    e.preventDefault()
    props.addEducation(formData,props.history)
}

const handleCurentCheckbox = (e)=>{
    setDisableTo(!disableTo)
    handleOnChange(e);
}

    return (
        <div>
            <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value= {school} onChange={e=>handleOnChange(e)} 
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value= {degree} onChange={e=>handleOnChange(e)} 
            required
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldofstudy" value= {fieldofstudy} onChange={e=>handleOnChange(e)}  />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from"  value= {from} onChange={e=>handleOnChange(e)} />
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" name="current" value= {current} onChange={e=>handleCurentCheckbox(e)}   /> Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to"  value= {to} onChange={e=>handleOnChange(e)} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
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
      addEducation: (formData, history)=>dispatch(addEducation(formData,history))
  }
}

export default connect(null,mapDispatchToProps)(withRouter(AddEducation))
