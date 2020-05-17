import React from "react";

import PageBody from './PageBody';
import Header from './header';
import Footer from './footer';

class Layout extends React.Component {
  render() {
    return (
      <div className="layout">
        <Header />
        <PageBody />
        <Footer />
      </div>
    );
  }
}

export default Layout;
