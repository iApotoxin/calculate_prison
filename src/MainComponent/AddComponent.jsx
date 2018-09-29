import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import throttle from 'lodash.throttle';
import 'antd/dist/antd.css';
import Sub from '../SubComponent/Add/AddSub'
import Main from '../SubComponent/Add/AddMain'
import {
    BrowserRouter,
    Route,
    Link,
} from 'react-router-dom';


const { Content, Sider } = Layout;


class AddComponent extends Component {
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
                        <AddMenu></AddMenu>
                        </Sider>
                        <AddContent></AddContent>
                    </Layout>    
            </BrowserRouter>
            );
        }

        return (
            <BrowserRouter>
                <Content style={{ padding: '0 20px'}}>
                    <Layout style={{ padding: '22px 0 70px', background: '#fff' }}>
                        <div style={{ marginBottom:'20px' }}>
                        <AddMenu></AddMenu>
                        </div>
                        <AddContent></AddContent>
                    </Layout>
                </Content>
            </BrowserRouter>
        );
    }
}

const AddContent=()=>{
    return(
        <Content style={{ padding: '0 24px', minHeight: 280}}>
        <Route exact path="/Add" component={Main} />
        <Route path="/Add/main" component={Main} />
        <Route path="/Add/sub" component={Sub} />
   
    </Content>
    )
}

const AddMenu=(props)=> {
        return(
            <Menu
            theme= "light"
            mode="inline"
            defaultSelectedKeys={['Main']}
            defaultOpenKeys={['Main']}
            style={{ height: '100%'}}
        >
        <Menu.Item key="Main">
                <Link to="/Add/main">
                    เพิ่มข้อมูลหลัก
            </Link>
            </Menu.Item>
            <Menu.Item key="Sub">
                <Link to="/Add/sub">
                    เพิ่มข้อมูลย่อย
            </Link>
            </Menu.Item>
            
        </Menu>
        )
}
AddComponent.defaultProps = {
    mobileBreakPoint: 575,
    applyViewportChange: 250,
  };

export default AddComponent