import React, {useEffect} from 'react'
import ListErrors from './ListErrors'
import agent from '../agent'
import {connect} from 'react-redux'
import {
    UPDATE_FIELD_AUTH,
    REGISTER,
    REGISTER_PAGE_UNLOADED,
} from '../constants/actionTypes'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const mapStateToProps = state => ({
    auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
    onChangeEmail: value =>
        dispatch({type: UPDATE_FIELD_AUTH, key: 'email', value}),
    onChangePassword: value =>
        dispatch({type: UPDATE_FIELD_AUTH, key: 'password', value}),
    onChangeFirstName: value =>
        dispatch({type: UPDATE_FIELD_AUTH, key: 'firstName', value}),
    onChangeLastName: value =>
        dispatch({type: UPDATE_FIELD_AUTH, key: 'lastName', value}),
    onSubmit: (firstName, lastName, email, password) => {
        const payload = agent.Auth.register(firstName, lastName, email, password)
        dispatch({type: REGISTER, payload})
    },
    onUnload: () =>
        dispatch({type: REGISTER_PAGE_UNLOADED}),
})

const Register = ({auth, onChangeEmail, onChangePassword, onChangeFirstName, onChangeLastName, onSubmit, onUnload}) => {
    const {email, password, firstName, lastName, errors, inProgress} = auth

    const changeEmail = ev => onChangeEmail(ev.target.value)
    const changePassword = ev => onChangePassword(ev.target.value)
    const changeFirstName = ev => onChangeFirstName(ev.target.value)
    const changeLastName = ev => onChangeLastName(ev.target.value)
    const submitForm = (firstName, lastName, email, password) => ev => {
        ev.preventDefault()
        onSubmit(firstName, lastName, email, password)
    }

    useEffect(() => {
        return () => onUnload()
    }, [])

    const classes = useStyles()

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
            </Typography>
                <form className={classes.form} noValidate onSubmit={submitForm(firstName, lastName, email, password)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={firstName}
                                onChange={changeFirstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={lastName}
                                onChange={changeLastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={changeEmail}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={changePassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={inProgress}
                    >
                        Sign Up
              </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                  </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
