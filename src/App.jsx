import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import AddComponent from './MainComponent/AddComponent';
import LoginPage from './MainComponent/LoginComponent';
import ShowComponent from './MainComponent/ShowComponent';
import PrivateRoute from './route';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
// import {  } from '@okta/okta-react/src/';

library.add(faStroopwafel);

// function onAuthRequired({history}){
//   history.push('/login');
// }

class App extends Component {
  render() {
    return (

      // <Security 
      // issuer='https://dev-491372.oktapreview.com/oauth2/default'
      // redirect_uri={window.location.origin + '/implicit/callback'}
      // client_id= '0oagnvvw1wFyJMK0g0h7'
      // onAuthRequired={onAuthRequired}
      // >
      <BrowserRouter>
      <Switch>
  
          {/* <Route exact path="/" component={AddComponent} />
            <Route path="/Add" component={AddComponent} />
            <Route path="/Show" component={ShowComponent} />
            <Route path="/login" component={LoginPage} /> */}

        <Route exact path="/" component={LoginPage}/>
        <PrivateRoute exact path="/Add" component={AddComponent}/>
        <PrivateRoute exact path="/Show" component={ShowComponent}/>
        <Route component={() => <h1>NoMatch</h1>}/>

      </Switch>
      </BrowserRouter>
      // </Security>
    );
  }
}

export default App;
