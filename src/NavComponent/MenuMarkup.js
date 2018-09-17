import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
    <Menu.Item key='/'>
      <Link onClick={onLinkClick} to='/'>Home</Link> 
    </Menu.Item>
    <Menu.Item key='/Announcement'>
      <Link onClick={onLinkClick} to='/Announcement'>Announcement</Link>
    </Menu.Item>
    <Menu.Item key='/Subject'>
      <Link onClick={onLinkClick} to='/Subject'>Subject</Link>
    </Menu.Item>
    <Menu.Item key='/Student'>
      <Link onClick={onLinkClick} to='/Student'>Student</Link>
    </Menu.Item>
  </Menu>
);

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
