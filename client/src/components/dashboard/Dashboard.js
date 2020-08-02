import React, { useEffect, Fragment } from 'react'
import { Redirect, Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {getProfile} from '../../redux/profile/profileAction'
import Spinner from '../layout/Spinner'


const Dashboard = (props) => {
    
    // if(!props.auth.isAuthenticated){
    //     return (<Redirect to='/'/>)
    // }



    useEffect(()=>{
        props.getCurrentProfile()
    }, [])
    return props.profile.loading && props.profile.profile===null ? <Spinner /> : 
    <>
     <h1 className="large text-primary">Dashboard</h1>
     <p className="lead">
<i className= "fas fa-user"></i> Welcome {props.auth.user && props.auth.user.name}
     </p>
     {props.profile.profile === null ? 
     <Fragment>
         <p> You do not have profile, please setup the profile</p>
         <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link> 
     </Fragment>
    : <Fragment>has</Fragment>}
    </>
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        profile: state.profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCurrentProfile: ()=>dispatch(getProfile())
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Dashboard)
