import React, { Component } from 'react';
import { Layout, Menu,  Icon } from 'antd';
import throttle from 'lodash.throttle';
import ShowAnnouncementComponent from '../SubComponent/Home/ShowAnnounceComponent'
import ShowScoreComponent from '../SubComponent/Home/ShowScoreComponent'
import 'antd/dist/antd.css';
import {
    BrowserRouter,
    Route,
    Link,
} from 'react-router-dom';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class HomeComponent extends Component {
    state = {
        viewportWidth: 0,
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
                    <Layout style={{ padding: '22px 20px', background: '#fff' ,height:'100vh'}}>
                        <Sider>
                        <HomeMenu></HomeMenu>
                        </Sider>
                        <HomeContent></HomeContent>
                    </Layout>    
            </BrowserRouter>
            );
        }

        return (
            <BrowserRouter>
                <Content style={{ padding: '0 20px'}}>
                    <Layout style={{ padding: '22px 0', background: '#fff' }}>
                        <div style={{ marginBottom:'20px' }}>
                        <HomeMenu></HomeMenu>
                        </div>
                        <HomeContent></HomeContent>
                    </Layout>
                </Content>
            </BrowserRouter>
        );
    }
}
const HomeContent=()=>{
    return(
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <Route exact path="/" component={ShowAnnouncementComponent} />
        <Route path="/showAnnounce" component={ShowAnnouncementComponent} />
        <Route path="/showScore" component={ShowScoreComponent} />
    </Content>
    )
}
const HomeMenu = () => {
    return (
        <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['showAnnounce']}
            defaultOpenKeys={['showAnnounce']}
            style={{ height: '100%' }}
        >
            <Menu.Item key="showAnnounce">
                <Link to="/showAnnounce">
                    <Icon type="notification" style={{ fontSize: 20 }} />
                    Announcement
                            </Link>
            </Menu.Item>
            <Menu.Item key="showScore">
                <Link to="/showScore">
                    <Icon type="laptop" style={{ fontSize: 20 }} />
                    Score
                            </Link>
            </Menu.Item>

        </Menu>
    )
}
HomeComponent.defaultProps = {
    mobileBreakPoint: 575,
    applyViewportChange: 250,
};


export default HomeComponent