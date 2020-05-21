import React, { FC } from "react";
import { Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import styled from "styled-components";
import loadable from '@loadable/component';
import PrivateRoute from '../../components/privateRoute';

import routes from '../routes';
// import NotFoundPage from '../../views/NotFoundPage';
const NotFoundPage = loadable(() => import('../../views/notFoundPage' /* webpackChunkName: 'NotFoundPage' */));

const BodyContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 50px);
  padding: 0 10px;
  margin: 0 auto;
  display: flex;
  direction: row;
  justify-content: center;
  align-items: stretch;
`;

const RoutePage: FC<any> = (route) => {
  return route.isPrivate
    ? (
      <PrivateRoute
        key={route.path}
        exact={route.exact}
        path={route.path}
        component={route.component}
      />
    )
    : (
    <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />
  );
}

const PageBody: FC<any> = ({ ...otherProps }) => {
  return (
    <Container maxWidth="xl">
      <BodyContainer className={'page-body'}>
        <Switch>
          { routes.map(RoutePage) }
          <Route component={NotFoundPage} />
        </Switch>
      </BodyContainer>
    </Container>
  );
}

export default PageBody;
