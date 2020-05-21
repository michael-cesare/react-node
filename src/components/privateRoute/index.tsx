import React, { FC } from "react";
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

interface StateProps {
  isAuthenticated: boolean
}

interface DispatchProps {
}

interface OwnProps {
  component: any,
  path: any,
  location: any,
  exact: boolean,
  ComponentProps: any,
}

type Props = StateProps & DispatchProps & OwnProps;

const mapState = (state: any) => ({
  isAuthenticated: state.getIn(['user', 'auth', 'isAuthenticated']),
})

const mapDispatch = {
}

const PrivateRoute: FC<Props> = ({
  component: ComponentToRender, path, location, isAuthenticated, ComponentProps, ...rest
}) => (
  <Route
    {...rest}
    path={path} 
    render={routerProps => (isAuthenticated
      ? <ComponentToRender {...routerProps} {...ComponentProps} />
      : (
        <Redirect
          to={{ pathname: '/login', state: { from: routerProps.location.pathname } }}
        />
      )
    )}
  />
);

const PrivateRouteConnect = connect<StateProps, DispatchProps, OwnProps>(
  mapState,
  mapDispatch,
)(PrivateRoute)

export default PrivateRouteConnect;
