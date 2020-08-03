import React, { useEffect, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {getProfile} from '../../redux/profile/profileAction'
import Spinner from '../layout/Spinner'
import DashBoardActions from './DashBoardActions'
import Experience from './Experience'
import Education from './Education'
import {deleteAccount} from '../../redux/profile/profileAction'


const Dashboard = (props) => {
    
    // if(!props.auth.isAuthenticated){
    //     return (<Redirect to='/'/>)
    // }

    const {getCurrentProfile} = props

    useEffect(()=>{
        getCurrentProfile()
    }, [getCurrentProfile])
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
    : <Fragment>
        <DashBoardActions/>
        <Experience experience={props.profile.profile.experience} />
        <Education education={props.profile.profile.education}/>
        <div className="my-2">
            <button className="btn btn-danger" onClick={()=>props.deleteAccount(props.history)}>
                <i className="fas fa-user-minus"/>Delete Account
            </button>
        </div>
    </Fragment>}
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
        getCurrentProfile: ()=>dispatch(getProfile()),
        deleteAccount: (history)=> dispatch(deleteAccount(history))
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (withRouter(Dashboard))
