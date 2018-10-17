import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import throttle from 'lodash.throttle';
import Main from '../SubComponent/Show/ShowMain'
import 'antd/dist/antd.css';
import {
    BrowserRouter,
    Route,
    Link,
} from 'react-router-dom';


const { Content, Sider } = Layout;


class ShowComponent extends Component {
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
                    <Layout style={{ padding: '22px 20px 70px', background: '#fff'}}>
                        <Sider>
                        <ShowMenu></ShowMenu>
                        </Sider>
                        <ShowContent></ShowContent>
                    </Layout>    
            </BrowserRouter>
            );
        }

        return (
            <BrowserRouter>
                <Content style={{ padding: '0 20px'}}>
                    <Layout style={{ padding: '22px 0 70px', background: '#fff' }}>
                        <div style={{ marginBottom:'20px' }}>
                        <ShowMenu></ShowMenu>
                        </div>
                        <ShowContent></ShowContent>
                    </Layout>
                </Content>
            </BrowserRouter>
        );
    }
}

const ShowContent=()=>{
    return(
        <Content style={{ padding: '0 24px'}}>
        <Route exact path="/Show" component={Main} />
        <Route path="/Show/main" component={Main} />
        {/* <Route path="/Show/sub" component={Sub} /> */}
   
    </Content>
    )
}

const ShowMenu=(props)=> {
        return(
            <Menu
            theme= "light"
            mode="inline"
            defaultSelectedKeys={['Main']}
            defaultOpenKeys={['Main']}
            style={{ height: '100%'}}
        >
        <Menu.Item key="Main">
                <Link to="/Show/main">
                   ตารางข้อมูลหลัก
            </Link>
            </Menu.Item>
            <Menu.Item key="Sub">
                <Link to="/Show/sub">
                   ตารางข้อมูลย่อย
            </Link>
            </Menu.Item>
            
        </Menu>
        )
}
ShowComponent.defaultProps = {
    mobileBreakPoint: 575,
    applyViewportChange: 250,
  };

export default ShowComponent