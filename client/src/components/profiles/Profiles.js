import React, { Fragment, useEffect } from 'react'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import {getProfiles} from '../../redux/profile/profileAction'
import ProfileItem from './ProfileItem'

const Profiles = (props) => {
    console.log(props.profile)
    const {getProfiles} = props
    const {loading, profiles } = props.profile
    useEffect(()=>{
        getProfiles()
    }, [getProfiles])
    
    return (
        <Fragment>
            {loading? <Spinner /> :
            <Fragment>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                <i className="fab fa-connectdevelop"></i> Browse and connect with Developers   
                </p>
                <div className="profiles">
                    {profiles.length > 0 ? (
                        profiles.map(profile=> <ProfileItem key={profile._id} profile={profile} />)
                    ): <h4> No Profiles Found</h4>}
                </div>
            </Fragment>}
        </Fragment>
    )
}


const mapStateToProps = state => {
    return {
    profile: state.profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfiles: ()=>dispatch(getProfiles())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profiles)
