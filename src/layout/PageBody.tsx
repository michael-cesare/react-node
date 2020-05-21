import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from '../views/NotFoundPage';

import routes from './routes';

import loadable from '@loadable/component';
// import Form from '../components/Form';
 const Form = loadable(() => import('../components/Form' /* webpackChunkName: 'Form' */));

class PageBody extends React.Component {
  render() {
    return (
      <div className="body">
        <Form />
        <Switch>
          { routes.map( route => <Route key={route.path} exact={route.exact} path={route.path} component={route.component} /> ) }
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default PageBody;
