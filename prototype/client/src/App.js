import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import NavBar from './NavBar.js';
import PopularMovies from './PopularMovies.js';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {

  apiKey: "AIzaSyA_BG0NbMVTorVjwiUnRgy02khTuG6boSg",

  authDomain: "cs411-7dd75.firebaseapp.com",

  projectId: "cs411-7dd75",

  storageBucket: "cs411-7dd75.appspot.com",

  messagingSenderId: "134205736856",

  appId: "1:134205736856:web:5d93d359bd7d6247eb4ded",

  measurementId: "G-RSJ788MYYT"

};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
var firebase = require('firebase')
var firebaseui = require('firebaseui')
var ui = new firebaseui.auth.AuthUI(firebase.auth());

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={5}>
            <PopularMovies />
          </Grid>
          <Grid item xs={5}>
            <PopularMovies />
          </Grid>
          <Grid item xs={5}>
            <PopularMovies />
          </Grid>
          <Grid item xs={5}>
            <PopularMovies />
          </Grid>
        </Grid>

      </div>
    );
  }
}

export default App;