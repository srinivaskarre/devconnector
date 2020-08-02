import React, { Fragment } from 'react'
import Moment from 'react-moment'
import { deleteEducation } from '../../redux/profile/profileAction'
import {connect} from 'react-redux'

const Education = ({education, deleteEducation}) => {
    const onSubmit = e=> {
        e.preventDefault()
        deleteEducation(e.target.value)
    }

    const educationList = education.map(edu=> (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {
                    edu.to === null ? ('Present') : <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                }
            </td>
            <td>
                <button className="btn btn-danger" value={edu._id} onClick={e=>onSubmit(e)}>Delete</button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Education</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>School</th>
                    <th className="hide-sm">Degree</th>
                    <th className="hide-sm">Years</th>
                </tr> 
                </thead>
                <tbody>{educationList}</tbody>   
            </table>
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteEducation: (expId)=>dispatch(deleteEducation(expId))
    }
}

export default connect(null,mapDispatchToProps)(Education)
