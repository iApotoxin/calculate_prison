import React, { Component } from 'react';
import './App.css';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import AddComponent from './MainComponent/AddComponent';
import LoginPage from './MainComponent/LoginComponent';
import ShowComponent from './MainComponent/ShowComponent';
import Header from './Header';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
// import {  } from '@okta/okta-react/src/';



const { Content, Footer } = Layout;
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
        <Layout>
          <Header/>
          <Content style={{}}>
            <Route exact path="/" component={AddComponent} />
            <Route path="/Add" component={AddComponent} />
            <Route path="/Show" component={ShowComponent} />
            <Route path="/login" component={LoginPage} />
          </Content>


          <Footer style={{ textAlign: 'center', bottom: 0, left: 0, width: '100%' }}>
            Prison Calculate ©2018 Created by Apotoxin
          </Footer>
        </Layout>
      </BrowserRouter>
      // </Security>
    );
  }
}

export default App;
