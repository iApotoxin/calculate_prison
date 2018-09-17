import React from 'react';
import { withRouter } from 'react-router';

import MenuMarkup from './NavComponent/MenuMarkup';
import ResponsiveNav from './NavComponent/ResponsiveNav';

const Header = ({ location }) => {
  return (
    <div>
      <ResponsiveNav
      activeLinkKey={location.pathname}
      menuMarkup={MenuMarkup}
    />
    </div>
    
  );
};

export default withRouter(Header);
