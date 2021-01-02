import React from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import './App.css';
import Home from './containers/Home'
import SignIn from './containers/SignIn'
import SignUp from './containers/SignUp'
import PrivateRoute from './components/HOC/PrivateRoute'
//using react router dom we can create pages

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path = "/" exact component = {Home}/>
          <Route path = "/signin" component = {SignIn}/>
          <Route path = "/signup" component = {SignUp}/>
        </Switch>
      </Router>
    </div>
  );
}
export default App;