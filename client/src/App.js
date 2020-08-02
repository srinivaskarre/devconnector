import React,{Fragment, useEffect} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { Provider } from 'react-redux';
import store from './redux/store';
import Alert from './components/layout/Alert';
import {setAuthToken} from './utils/util'
import {loadUser} from './redux/auth/authActions'
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/route/PrivateRoute';
import CreateProfile from './components/profileforms/CreateProfile';
import EditProfile from './components/profileforms/EditProfile';
import AddExperience from './components/profileforms/AddExperience';
import AddEducation from './components/profileforms/AddEducation';
import Profiles from './components/profiles/Profiles';

setAuthToken();

const App = () => { 
  
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  
  return (
<Provider store = {store}>  
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Alert />
        <Switch>

          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profiles" component={Profiles} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path='/create-profile' component={CreateProfile} />
          <PrivateRoute exact path='/edit-profile' component={EditProfile} />
          <PrivateRoute exact path='/add-experience' component={AddExperience} />
          <PrivateRoute exact path='/add-education' component={AddEducation} />
        </Switch>

      </section>
      
    </Fragment>
  </Router>
  </Provider>
  )
}


export default App;
