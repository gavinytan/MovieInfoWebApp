const express = require('express');
const axios = require('axios');

////----login code----////
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport');
const cookieSession = require('cookie-session')
require('./passport-setup');
////----login code----////





const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;
const api_key = 'fe198c3817bf7eb40d02b4b22aacfe20';
const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`;
const genre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`


////----login code----////
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// For an actual app you should configure this with an experation time, better keys, proxy and secure
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Example protected and unprotected routes
app.get('/', (req, res) => res.send('use localhost:5000/google to log in'))
app.get('/failed', (req, res) => res.send('You Failed to log in!'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/good', isLoggedIn, (req, res) => res.send(`Current User: ${req.user.displayName}!`))

// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

////----login code----////


app.post('/api/movie', async(req, res) => {
    const api_result = await axios.get(url)
    let output = [];
    const num_movies = req.body.number;
    api_result.data.results.map((cur, idx) => {
        output.push(idx);
        if (output.length > num_movies) {
            output.sort(function(a, b) {return api_result.data.results[b].popularity - api_result.data.results[a].popularity; })
            output.pop();
        }
    });
    output_titles = output.map((idx) => api_result.data.results[idx].title)
    res.send({titles: output_titles})

})



app.listen(port, () => console.log(`Listening on port ${port}`));
