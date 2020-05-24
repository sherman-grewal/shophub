import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import VisibilityIcon from '@material-ui/icons/Visibility'
import IconButton from '@material-ui/core/IconButton'
import ShareIcon from '@material-ui/icons/Share'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 240,
        objectFit: 'scale-down',
    },
    cardPricing: {
        display: 'flex',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
}))

const ItemCard = ({item}) => {
    const classes = useStyles()
    return (
        <Grid item key={item.title} xs={12} sm={item.title === 'Enterprise' ? 12 : 6} md={4}>
            <Card className={classes.root}>
            <CardActionArea>
            <CardMedia
                className={classes.media}
                component='img'
                image={item.displayPicture ? item.displayPicture : "/static/images/cards/contemplative-reptile.jpg"}
                title={item.title}
            />
            <CardContent className={classes.cardPricing}>
                <Typography gutterBottom variant="h5" component="h2">
                {item.title}
                </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
            <IconButton color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
            </IconButton>
            <IconButton color="primary" aria-label="add to shopping cart">
                <VisibilityIcon />
            </IconButton>
            <IconButton color="primary" aria-label="add to shopping cart">
            <ShareIcon />
            </IconButton>
            </CardActions>
        </Card>
      </Grid>
    )
}

export default connect()(ItemCard)
