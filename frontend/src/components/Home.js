import React from 'react'
import {connect} from 'react-redux'
import {CHANGE_TAB} from '../constants/actionTypes'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import StarIcon from '@material-ui/icons/StarBorder'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import './Home.scss'
import AppHeader from './AppHeader'
import ItemCard from './ItemCard'


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                shophub
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}))

const mapStateToProps = state => ({
    token: state.common.token,
})

const mapDispatchToProps = dispatch => ({
    onTabClick: (tab, pager, payload) => dispatch({type: CHANGE_TAB, tab, pager, payload}),
})

const tiers = [
    {
        title: 'Men\'s Polo Bear Wool Sweater',
        company: 'Polo Ralph Lauren',
        price: '$50.00',
        currency: 'CAD',
        displayPicture: require('../images/polo-bear.jpg'),
    },
    {
        title: 'Men\'s Tiro Training Shorts',
        company: 'Adidas',
        price: '$30.00',
        currency: 'CAD',
        displayPicture: require('../images/tiro.jpg'),
    },
    {
        title: 'Men\'s Airmax 97',
        company: 'Nike',
        price: '$300.00',
        currency: 'CAD',
        displayPicture: require('../images/airmax97.jpg'),
    },
    {
        title: 'Men\'s Polo Bear Wool Sweater',
        company: 'Polo Ralph Lauren',
        price: '$50.00',
        currency: 'CAD',
        displayPicture: require('../images/polo-bear.jpg'),
    },
    {
        title: 'Men\'s Tiro Training Shorts',
        company: 'Adidas',
        price: '$30.00',
        currency: 'CAD',
        displayPicture: require('../images/tiro.jpg'),
    },
    {
        title: 'Men\'s Airmax 97',
        company: 'Nike',
        price: '$300.00',
        currency: 'CAD',
        displayPicture: require('../images/airmax97.jpg'),
    },
    {
        title: 'Men\'s Polo Bear Wool Sweater',
        company: 'Polo Ralph Lauren',
        price: '$50.00',
        currency: 'CAD',
        displayPicture: require('../images/polo-bear.jpg'),
    },
    {
        title: 'Men\'s Tiro Training Shorts',
        company: 'Adidas',
        price: '$30.00',
        currency: 'CAD',
        displayPicture: require('../images/tiro.jpg'),
    },
    {
        title: 'Men\'s Airmax 97',
        company: 'Nike',
        price: '$300.00',
        currency: 'CAD',
        displayPicture: require('../images/airmax97.jpg'),
    },
]

const Home = () => {
    const classes = useStyles()

    return (
        <React.Fragment>
            <CssBaseline />
            <AppHeader />
            <Container maxWidth="md" component="main">
                <Typography variant="h6" color="inherit" noWrap className="sectionTitle">
                    New Arrivals
                </Typography>
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <ItemCard item={tier} />
                    ))}
                </Grid>
            </Container>
            {/* Footer */}
            <Container maxWidth="md" component="footer" className={classes.footer}>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
            {/* End footer */}
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
