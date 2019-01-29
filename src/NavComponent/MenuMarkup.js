import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Auth from '../shared/auth'
import { Button } from 'antd';
// use babel-import-plugin as specified in Ant Design Docs!
// https://ant.design/docs/react/getting-started#Import-on-Demand
import Menu from 'antd/lib/menu';
import 'antd/lib/menu/style/css';
const MenuMarkup = ({ mobileVersion, activeLinkKey, onLinkClick, className }) => (
  <Menu
    theme={mobileVersion ? 'light' : 'dark'}
    mode={mobileVersion ? 'vertical' : 'horizontal'}
    selectedKeys={[`${activeLinkKey}`]}
    className={className}
  >
   <Menu.Item key='/Show'>
      <Link onClick={onLinkClick} to='/Show'>แสดงข้อมูล</Link>
    </Menu.Item>
    <Menu.Item key='/Add'>
      <Link onClick={onLinkClick} to='/Add'>เพิ่มข้อมูล</Link>
    </Menu.Item>
    <Button onClick={()=>{logout()}}  style={{float:'right',height:'46px',borderRadius:0}} type="danger">
    <Link onClick={onLinkClick} to='/'>ออกจากระบบ</Link>
    </Button>
  </Menu>

);

const logout=()=>{
  // console.log('logout')
  Auth.clearCookies();
}

MenuMarkup.propTypes = {
  mobileVersion: PropTypes.bool,
  activeLinkKey: PropTypes.string.isRequired,
  onLinkClick: PropTypes.func,
  className: PropTypes.string,
};

MenuMarkup.defaultProps = {
  mobileVersion: false,
  className: 'mobile-navigation',
};

export default MenuMarkup;
