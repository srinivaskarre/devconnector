import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../redux/auth/authActions'

function Navbar(props) {

  const authLinks = (
    <ul>
      <li>
        <Link to='/dashboard'>
           <i className='fas fa-user' />{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>

        <a onClick={props.logout} href="#!">
          <i className="fas fa-sign-out-alt" /> {' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  )

  const guestLink = (
    <ul>
        <li><Link to="#!">Developers</Link></li>
        <li><Link to="/signup">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
  );
    return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>

      {!props.auth.isLoading && (props.auth.isAuthenticated ? authLinks : guestLink)}
      
    </nav>
    )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: ()=>dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Navbar)
