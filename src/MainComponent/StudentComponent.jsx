import React, { Component } from 'react';
import { DatePicker, Layout, Menu, Breadcrumb, Icon, Slider } from 'antd';
import throttle from 'lodash.throttle';
import 'antd/dist/antd.css';
import AddStudentComponent from '../SubComponent/Student/AddStudent.jsx'
import ChangeStudentComponent from '../SubComponent/Student/ChangeStudent.jsx'
import {
    BrowserRouter,
    HashRouter,
    Route,
    Link,
    NavLink
} from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


class StudentComponent extends Component {
    state={
        viewportWidth:0,
    }
    componentDidMount() {
        this.saveViewportDimensions();
        window.addEventListener('resize', this.saveViewportDimensions);
      }
    
      componentWillUnmount() {
        window.removeEventListener('resize', this.saveViewportDimensions);
      }
    
      saveViewportDimensions = throttle(() => {
        this.setState({
          viewportWidth: window.innerWidth,
        })
      }, this.props.applyViewportChange);

    render() {
        if (this.state.viewportWidth > this.props.mobileBreakPoint){
            return(
                <BrowserRouter>
                    <Layout style={{ padding: '22px 20px 70px', background: '#fff' ,height:'100vh'}}>
                        <Sider>
                        <StudentMenu></StudentMenu>
                        </Sider>
                        <StudentContent></StudentContent>
                    </Layout>    
            </BrowserRouter>
            );
        }

        return (
            <BrowserRouter>
                <Content style={{ padding: '0 20px'}}>
                    <Layout style={{ padding: '22px 0 70px', background: '#fff' }}>
                        <div style={{ marginBottom:'20px' }}>
                        <StudentMenu></StudentMenu>
                        </div>
                        <StudentContent></StudentContent>
                    </Layout>
                </Content>
            </BrowserRouter>
        );
    }
}

const StudentContent=()=>{
    return(
        <Content style={{ padding: '0 24px', minHeight: 280}}>
        <Route exact path="/Student" component={AddStudentComponent} />
        <Route path="/Student/addStudent" component={AddStudentComponent} />
        <Route path="/Student/changeStudent" component={ChangeStudentComponent} />
    </Content>
    )
}

const StudentMenu=(props)=> {
        return(
            <Menu
            theme= "dark"
            mode="inline"
            defaultSelectedKeys={['studentAdd']}
            defaultOpenKeys={['studentAdd']}
            style={{ height: '100%'}}
        >
            <Menu.Item key="studentAdd">
                <Link to="/Student/addStudent">
                    <Icon type="user-add" style={{fontSize: 20 }} />
                    Add Student
            </Link>
            </Menu.Item>
            <Menu.Item key="studentChange">
                <Link to="/Student/changeStudent">
                    <Icon type="edit"  style={{fontSize: 20 }} />
                    Edit/Delete Student
            </Link>
            </Menu.Item>
        </Menu>
        )
}
StudentComponent.defaultProps = {
    mobileBreakPoint: 575,
    applyViewportChange: 250,
  };

export default StudentComponent