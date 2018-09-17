import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// use babel-import-plugin as specified in Ant Design Docs!
// https://ant.design/docs/react/getting-started#Import-on-Demand
import { Menu, Icon, Button,Collapse,Popover } from 'antd';
import 'antd/lib/popover/style/css';
import 'antd/lib/icon/style/css';

import '../App.css';
const Panel = Collapse.Panel;

class ResponsiveNav extends Component {
  state = {
    viewportWidth: 0,
    collapsed: false,
  };
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
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
    const MenuMarkup = this.props.menuMarkup;
    function callback(key) {
      console.log(key);
    }

    if (this.state.viewportWidth > this.props.mobileBreakPoint) {
      return <MenuMarkup activeLinkKey={this.props.activeLinkKey} />;
    }

    return (
      // <Menu
      // theme={ 'dark'}
      // style={{height:'46px'}}
      // >
      //   <Icon onClick={this.toggleCollapsed} style={{fontSize:'46px'}} type={this.state.collapsed ? 'up-square' : 'down-square'} />
      // </Menu>
      <Collapse onChange={callback}>
        <Panel showArrow={false} header={ <div style={{verticalAlign:'center'}}><Icon type="bars" style={{ color: '#fff',fontSize:'18px'}} />
          <p style={{color:'white',display:'inline'}}>  Logo</p></div> } style={{backgroundColor:'#001529'}} >
        <MenuMarkup
          onLinkClick={() => this.handleMenuVisibility(false)}
          activeLinkKey={this.props.activeLinkKey}
          mobileVersion
          // className='to-override-mobile-menu-class'
          />
        </Panel>
      </Collapse>
    );
  }
}

ResponsiveNav.propTypes = {
  mobileBreakPoint: PropTypes.number,
  applyViewportChange: PropTypes.number,
  activeLinkKey: PropTypes.string,
  menuMarkup: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
};

ResponsiveNav.defaultProps = {
  mobileBreakPoint: 575,
  applyViewportChange: 250,
};

export default ResponsiveNav
