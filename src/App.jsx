import React, { Component } from 'react';
import './App.css';
import { DatePicker, Layout, Menu, Breadcrumb, Icon } from 'antd';
import 'antd/dist/antd.css';
import HomeComponent from './MainComponent/HomeComponent'
import SubjectComponent from './MainComponent/SubjectComponent'
import AnnouncementComponent from './MainComponent/AnnouncementComponent'
import StudentComponent from './MainComponent/StudentComponent'
import Header from './Header'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';

const { SubMenu } = Menu;
const {  Content, Footer, Sider } = Layout;
library.add(faStroopwafel);

class App extends Component {
  render() {
    return (


      <BrowserRouter>
        <Layout>
          <Content style={{}}>
            <Route path="/" component={Header} />
            <Route exact path="/" component={HomeComponent} />
            <Route path="/Announcement" component={AnnouncementComponent} />
            <Route path="/Subject" component={SubjectComponent} />
            <Route path="/Student" component={StudentComponent} />
          </Content>


          <Footer style={{ textAlign: 'center',bottom:0,left:0,position:'fixed',width:'100%' }}>
            Student-W ©2018 Created by Apotoxin
          </Footer>
        </Layout>
      </BrowserRouter>

    );
  }
}

export default App;
