
import React, { Props, Component } from "react";
import { withStyles, Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import { IProfilePageState } from './interfaces';

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

type ProfilePageType = {
  classes: any,
};

class ProfilePage extends Component<ProfilePageType, IProfilePageState> {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.page}>
        <h1>Login Page!</h1>
      </Paper>
    );
  }
}

export default withStyles(styles)(ProfilePage);
