import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './containers/Home'
import SignIn from './containers/SignIn'
import SignUp from './containers/SignUp'
import Products from './containers/Products'
import Orders from './containers/Orders'
import PrivateRoute from './components/HOC/PrivateRoute'
import { isUserLoggedIn } from './actions';
import { useDispatch, useSelector } from 'react-redux';

//using react router dom we can create pages

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, []);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/products" component = {Products} />
        <PrivateRoute path="/orders" component = {Orders} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}
export default App;