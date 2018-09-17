import React, { Component } from 'react';
import { DatePicker, Layout, Menu, Breadcrumb, Icon } from 'antd';
import throttle from 'lodash.throttle';
import 'antd/dist/antd.css';
import AddScoreComponent from '../SubComponent/Subject/AddScore'
import ChangeScoreComponent from '../SubComponent/Subject/ChangeScore'
import AddSubjectComponent from '../SubComponent/Subject/AddSubject'
import ChangeSubjectComponent from '../SubComponent/Subject/ChangeSubject'
import {
    BrowserRouter,
    HashRouter,
    Route,
    Link,
    NavLink
} from 'react-router-dom';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;



class SubjectComponent extends Component {
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
        if (this.state.viewportWidth > this.props.mobileBreakPoint) {
            return (
                <BrowserRouter>
                    <Layout style={{ padding: '22px 20px', background: '#fff', height: '100vh' }}>
                        <Sider>
                            <SubjectMenu></SubjectMenu>
                        </Sider>
                        <SubjectContent></SubjectContent>
                    </Layout>
                </BrowserRouter>
            );
        }

        return (
            <BrowserRouter>
                <Content style={{ padding: '0 20px' }}>
                    <Layout style={{ padding: '22px 0', background: '#fff' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <SubjectMenu></SubjectMenu>
                        </div>
                        <SubjectContent></SubjectContent>
                    </Layout>
                </Content>
            </BrowserRouter>
        );
    }
}

const SubjectContent = () => {
    return (
        <Content style={{ padding: '0 24px', height: '100vh' }}>
            <Route exact path="/Subject" component={AddSubjectComponent} />
        <Route path="/Subject/addSubject" component={AddSubjectComponent} />
        <Route path="/Subject/changeSubject" component={ChangeSubjectComponent} />
        <Route path="/Subject/addScore" component={AddScoreComponent} />
        <Route path="/Subject/changeScore" component={ChangeScoreComponent} />
        </Content>
    )
}
const SubjectMenu = (props) => {
    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['addSubject']}
            defaultOpenKeys={['Subject']}
            style={{ height: '100%' }}
        >
            <SubMenu key="Subject" title={<span><Icon type="folder"  style={{fontSize: 20 }} />Subject</span>}>
                <Menu.Item key="addSubject">
                <Link to="/Subject/addSubject">
                Create Subject
                </Link>
                </Menu.Item>
                <Menu.Item key="changeSubject">
                <Link to="/Subject/changeSubject">
                Edit/Delete Subject
                </Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="Score" title={<span><Icon type="file"  style={{fontSize: 20 }} />Score</span>}>
                <Menu.Item key="addScore">
                <Link to="/Subject/addScore">
                Add Score
                </Link>
                </Menu.Item>
                <Menu.Item key="changeScore">
                <Link to="/Subject/changeScore">
                Edit/Delete Score
                </Link>
                </Menu.Item>
            </SubMenu>
        </Menu>
    )

}
SubjectComponent.defaultProps = {
    mobileBreakPoint: 575,
    applyViewportChange: 250,
};

export default SubjectComponent