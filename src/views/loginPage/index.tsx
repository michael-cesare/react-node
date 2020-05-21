
import React, { Component } from "react";
import { connect } from 'react-redux';
import { withStyles, Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { ILoginPage, ILoginForm } from './interfaces';
import SubmitBox from '../../components/buttons/SubmitBox';
import TextBox from '../../components/textBoxes/TextBox';

import {
  login,
} from '../../../redux/actions/userActions';

const styles = (theme: Theme) => ({
  page: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: '100%',
  },
});

const mapDispatch = {
  login,
};
const mapState = (state: any) => ({
  auth: state.getIn(['user', 'auth']),
  profile: state.getIn(['user', 'profile']),
});

interface StateProps {
  auth: any,
  profile: any,
};

interface DispatchProps {
  login: (username: string, password: string) => any,
};

interface OwnProps {
  classes: any,
};

type LoginPageProps = StateProps & DispatchProps & OwnProps;

class LoginPage extends Component<LoginPageProps, ILoginPage> {
  state = {
    loginForm: {
      username: '',
      password: '',
    },
  }

  constructor(props: any) {
    super(props)
  }

  _handleLogIn = (event) => {
    event.preventDefault();
    const { loginForm } = this.state;
    const { username, password } = loginForm;
    console.log('Username: ', username, 'Password: ', password);

    this.props.login(username, password);
  }

  _setUsername = (value) => {
    const { loginForm } = { ...this.state };
    loginForm['username'] = value;

    this.setState({
      loginForm,
    })
  }

  _setPassword = (value) => {
    const { loginForm } = { ...this.state };
    loginForm['password'] = value;

    this.setState({
      loginForm,
    })
  }

  renderBtnLogIn() {
    const { classes } = this.props;
    const { loginForm } = this.state;
    const { username, password } = loginForm;

    return (
      <div>
        <form
          id="loginForm"
          className={classes.container}
          onSubmit={this._handleLogIn}
        >
          <div className={classes.row}>
            <TextBox
              value={username}
              title="username"
              onChange={this._setUsername}
            />
          </div>
          <div className={classes.row}>
            <TextBox
              value={password}
              title="password"
              isPassword={true}
              onChange={this._setPassword}
            />
            <Typography className={classes.divider} />
            <SubmitBox
              value="Log In"
            />
          </ div>
        </form>
      </div>
    );
  }

  renderLogInArea() {
    const auth = this.props.auth.toJS();
    const profile = this.props.profile.toJS();

    let compToRender;
    if (profile && profile.isAuthenticated && auth && auth.user && profile.token) {
      compToRender = (
        <div>
          <div>already logged in as:</div>
          <div>
            username: {auth.user.name}
          </div>
          <div>
            email: {auth.user.email}
          </div>
          <div>
            group: {auth.user.group}
          </div>
          <div>
            token: {auth.user.token}
          </div>
        </div>
      );
    } else {
      compToRender = (
        <div>
          {this.renderBtnLogIn()}
        </div>
      );
    }

    return compToRender;
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <h1>Login Page!</h1>
        <div className={classes.page}>
          {this.renderLogInArea()}
        </div>
      </Paper>
    );
  }
}

const LoginPageStyled = withStyles(styles)(LoginPage);

const connector = connect<StateProps, DispatchProps, OwnProps>(
  mapState,
  mapDispatch,
)(LoginPageStyled)

export default connector;
