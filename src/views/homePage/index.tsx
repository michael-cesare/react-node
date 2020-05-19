
import React, { Props, Component } from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import InfoCard from '../../components/cards/infoCard';
import { IHomePageState, IGames } from './interfaces';


const styles = (theme: Theme) => createStyles({
  homePage: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: '100%',
  },
});
const useStylesHomePage = makeStyles(styles);

class HomePage extends Component<{}, IHomePageState> {
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
    // const classes = useStylesHomePage();
    const games = this.cardGames();

    return (
      // <div className={classes.homePage}>
      <Paper>
        <h1>Home Page!</h1>
        <Grid
          item
          container
          xs={12} sm={6} lg={4} xl={3}
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

export default HomePage;
