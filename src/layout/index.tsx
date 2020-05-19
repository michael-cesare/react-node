import React, { FC } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import styled from "styled-components";

import theme from '../theme';
import PageBody from './pageBody';
import Header from './header';
import Footer from './footer';

const LayoutContainer = styled.div`
  min-height:100vh;
`;

const Layout: FC<any> = ({ ...otherProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LayoutContainer>
        <Header />
        <PageBody />
        <Footer />
      </LayoutContainer>
    </ThemeProvider>
  );
}

export default Layout;
