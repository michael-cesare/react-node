import React, { FC } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    height: 0,
    paddingTop: '56.25%',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

type InfoCardType = {
  slug: string,
  media: {
    url: string,
    title: string,
    description: string,
  },
  navUrl: string,
};

const InfoCard: FC<InfoCardType> = ({ slug, media, navUrl, ...otherProps }) => {
  const classes = useStyles();

  return(
    <React.Fragment key={slug}>
      <Card>
        <ButtonBase className={classes.image}>
          <img
            className={classes.img}
            alt={media.title}
            src={media.url}
          />
        </ButtonBase>
        <CardContent>
          <Typography gutterBottom component="h2">
            {media.title}
          </Typography>
          <Typography component="p">
            {media.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" href={media.url} target="_blank">
            Go To Media
          </Button> 
        </CardActions>
      </Card>
    </React.Fragment>
  )
}

export default InfoCard;