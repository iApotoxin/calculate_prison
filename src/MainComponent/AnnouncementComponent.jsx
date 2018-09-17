import React, { Component } from 'react';
import { DatePicker, Layout, Menu, Breadcrumb, Icon } from 'antd';
import throttle from 'lodash.throttle';
import AddAnnounceComponent from '../SubComponent/Announcement/AddAnnouncement'
import ChangeAnnounceComponent from '../SubComponent/Announcement/ChangeAnnouncement'
import 'antd/dist/antd.css';
import {
    BrowserRouter,
    HashRouter,
    Route,
    Link,
    NavLink
} from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class AnnouncementComponent extends Component {
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
                        <Sider width={240}>
                        <AnnouncementMenu></AnnouncementMenu>
                        </Sider>
                        <AnnouncementContent></AnnouncementContent>
                    </Layout>    
            </BrowserRouter>
            );
        }

        return (
            <BrowserRouter>
                <Content style={{ padding: '0 20px'}}>
                    <Layout style={{ padding: '22px 0', background: '#fff' }}>
                        <div style={{ marginBottom:'20px' }}>
                        <AnnouncementMenu></AnnouncementMenu>
                        </div>
                        <AnnouncementContent></AnnouncementContent>
                    </Layout>
                </Content>
            </BrowserRouter>
        );
    }
}
const AnnouncementContent=()=>{
    return(
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <Route exact path="/Announcement" component={AddAnnounceComponent} />
        <Route path="/Announcement/announceAdd" component={AddAnnounceComponent} />
        <Route path="/Announcement/announceChange" component={ChangeAnnounceComponent} />
    </Content>
    )
}

const AnnouncementMenu = () => {
    return (
        <Menu
            mode="inline"
            theme= "dark"
            defaultSelectedKeys={['announceAdd']}
            defaultOpenKeys={['announceAdd']}
            style={{ height: '100%' }}
        >
            <Menu.Item key="announceAdd">
            <Link to="/Announcement/announceAdd">
                <Icon type="plus"  style={{fontSize: 20 }} />
                Add Announcement
                </Link>
            </Menu.Item>
            <Menu.Item key="announceChange"> 
            <Link to="/Announcement/announceChange">
                <Icon type="edit"  style={{fontSize: 20 }} />
               Edit/Delete Announcement
                </Link>
            </Menu.Item>
        </Menu>
    )
}
AnnouncementComponent.defaultProps = {
    mobileBreakPoint: 575,
    applyViewportChange: 250,
  };

export default AnnouncementComponent