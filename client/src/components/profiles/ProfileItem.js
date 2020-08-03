import React from 'react'
import { Link } from 'react-router-dom'

const ProfileItem = ({profile}) => {
    const {user} = profile
    const {status, location,skills, company} = profile
    return (
        <div className="profile bg-light">
            <img src={user.avatar} alt="" className="round-img"/>
            <div>
                <h2>{user.name}</h2>
                <p>{status} {profile.company && <span>at {company}</span>}</p>
                <p className="my-1">{location && <span>{location}</span>} </p>
                <Link to={`/profile/${user._id}`} className="btn btn-primary">View Profile</Link>
            </div>
            <ul>
                {skills.slice(0,4).map((skill,index)=> <li className="text-primary" key={index}>
    <i className="fas fa-check" />{' '}{skill}</li>)}
            </ul>
        </div>
    )
}

export default ProfileItem
