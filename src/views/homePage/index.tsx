
import React, { Props, Component } from "react";
import { withStyles, Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import InfoCard from '../../components/cards/infoCard';
import { IHomePageState, IGames } from './interfaces';

const styles = (theme: Theme) => ({
  homePage: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: '100%',
  },
});

type HomePageType = {
  classes: any,
};

class HomePage extends Component<HomePageType, IHomePageState> {
  constructor(props) {
    super(props)
    this.getGames()
  }

  getGames = () => {
    const ssrUrl = API_BASE_URL;
    const data: IGames = {
        games: [{
          slug: 'poker_casino',
          media: {
            url: '/static/images/poker_casino.jpg',
            title: 'Poker Casino',
            description: 'Poker Casino',
          },
          navUrl: `${ssrUrl}/games/poker_casino`,
        }]
    };

    // this.setState({ games: data.games })
    this.state = { games: data.games };
  }


  cardGames = () => {
    const { games } = this.state;

    return games.map(g => (
      <InfoCard
        key={g.slug}
        slug={g.slug}
        media={g.media}
        navUrl={g.navUrl}
      />
    ));
  }

  render() {
    const { classes } = this.props;
    const games = this.cardGames();

    return (
      <Paper className={classes.homePage}>
        <h1>Home Page!</h1>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="stretch"
          spacing={2}
        >
          {games}
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(HomePage);
