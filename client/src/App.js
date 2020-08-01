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
        </Switch>

      </section>
      
    </Fragment>
  </Router>
  </Provider>
  )
}


export default App;
