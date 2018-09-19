import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import throttle from 'lodash.throttle';
import 'antd/dist/antd.css';
import Sub from '../SubComponent/Prison/Sub'
import Main from '../SubComponent/Prison/Main'
import {
    BrowserRouter,
    Route,
    Link,
} from 'react-router-dom';


const { Content, Sider } = Layout;


class PrisonComponent extends Component {
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
                        <PrisonMenu></PrisonMenu>
                        </Sider>
                        <PrisonContent></PrisonContent>
                    </Layout>    
            </BrowserRouter>
            );
        }

        return (
            <BrowserRouter>
                <Content style={{ padding: '0 20px'}}>
                    <Layout style={{ padding: '22px 0 70px', background: '#fff' }}>
                        <div style={{ marginBottom:'20px' }}>
                        <PrisonMenu></PrisonMenu>
                        </div>
                        <PrisonContent></PrisonContent>
                    </Layout>
                </Content>
            </BrowserRouter>
        );
    }
}

const PrisonContent=()=>{
    return(
        <Content style={{ padding: '0 24px', minHeight: 280}}>
        <Route exact path="/" component={Main} />
        <Route path="/main" component={Main} />
        <Route path="/sub" component={Sub} />
   
    </Content>
    )
}

const PrisonMenu=(props)=> {
        return(
            <Menu
            theme= "light"
            mode="inline"
            defaultSelectedKeys={['Main']}
            defaultOpenKeys={['Main']}
            style={{ height: '100%'}}
        >
        <Menu.Item key="Main">
                <Link to="/main">
                    <Icon type="user-add"  style={{fontSize: 20 }} />
                    ข้อมูลหลัก
            </Link>
            </Menu.Item>
            <Menu.Item key="Sub">
                <Link to="/sub">
                    <Icon type="edit" style={{fontSize: 20 }} />
                    ข้อมูลย่อย
            </Link>
            </Menu.Item>
            
        </Menu>
        )
}
PrisonComponent.defaultProps = {
    mobileBreakPoint: 575,
    applyViewportChange: 250,
  };

export default PrisonComponent