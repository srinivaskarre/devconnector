import React, { Fragment } from 'react'
import Moment from 'react-moment'
import { deleteExpereince } from '../../redux/profile/profileAction'
import {connect} from 'react-redux'

const Experience = ({experience, deleteExperience}) => {

    const onSubmit = e=> {
        e.preventDefault()
        deleteExperience(e.target.value)
    }
    const experiences = experience.map(exp=> (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {
                    exp.to === null ? ('Present') : <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                }
            </td>
            <td>
                <button className="btn btn-danger" value={exp._id} onClick={e=>onSubmit(e)}>Delete</button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Experience</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Company</th>
                    <th className="hide-sm">Title</th>
                    <th className="hide-sm">Years</th>
                </tr> 
                </thead>
                <tbody>{experiences}</tbody>   
            </table>
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteExperience: (expId)=>dispatch(deleteExpereince(expId))
    }
}

export default connect(null,mapDispatchToProps)(Experience)
