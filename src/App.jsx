import React, { Component } from 'react';
import './App.css';
import { Layout} from 'antd';
import 'antd/dist/antd.css';
import PrisonComponent from './MainComponent/PrisonComponent'
import Header from './Header'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';

const {  Content, Footer } = Layout;
library.add(faStroopwafel);

class App extends Component {
  render() {
    return (


      <BrowserRouter>
        <Layout>
          <Content style={{}}>
            <Route path="/" component={Header} />
            <Route path="/" component={PrisonComponent} />
          </Content>


          <Footer style={{ textAlign: 'center',bottom:0,left:0,position:'fixed',width:'100%' }}>
            Prison Calculate ©2018 Created by Apotoxin
          </Footer>
        </Layout>
      </BrowserRouter>

    );
  }
}

export default App;
