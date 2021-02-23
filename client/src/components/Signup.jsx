import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



// TODO: FIX THIS STUFF!!!

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Coby Sher
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    flexGrow: 1,
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    display: 'flex'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    flexGrow: 1,
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({ history }) {
  const classes = useStyles();
  const [name, setName] = useState('')
  const [instrument, setInstrument] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin


  useEffect(() => {
    if (userInfo !== null && userInfo?._id) {
      history.push('/home')
    }
  }, [history, userInfo])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(register(name, email, password, instrument))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <InputLabel htmlFor='name'>Name</InputLabel>
              <Input
                className={classes.input}
                onChange={(e) => setName(e.target.value)}
                value={name}
                name='name'
                type='text'
                id='name'
              >
              </Input>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel htmlFor='instrument'>Instrument</InputLabel>
              <Input
                className={classes.input}
                onChange={(e) => setInstrument(e.target.value)}
                value={instrument}
                name='instrument'
                type='text'
                id='instrument'
              >
              </Input>
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='email'>Email</InputLabel>
              <Input
                className={classes.input}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name='email'
                type='text'
                id='email'
              >
              </Input>
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <Input
                className={classes.input}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name='password'
                type='password'
                id='password'
              >
              </Input>

            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/login">
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
  );
}
