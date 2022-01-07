const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;
const api_key = 'fe198c3817bf7eb40d02b4b22aacfe20';
const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`;
const genre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`;
const testing = `https://imdb-api.com/en/API/Top250Movies/k_1s3ffptn`;
const Top250Movies =  `https://imdb-api.com/en/API/Top250Movies/k_1s3ffptn`;
const comingSoon = `https://imdb-api.com/en/API/ComingSoon/k_1s3ffptn`;

const searchTitle = `https://imdb-api.com/en/API/ComingSoon/k_1s3ffptn`;
// const rating = `https://imdb-api.com/en/API/Ratings/k_1s3ffptn/tt1375666`;

//let input = request.body.input

app.get('/test', async (req, res)=>{
    const testing_result = await axios.get(testing)
    res.status(200).send(testing_result.data)
})

app.get('/test4', async (req, res)=>{
    const title_result = await axios.get(searchTitle)
    res.status(200).send(title_result.data)
})

app.get('/test5', async (req, res)=>{
    const rating_result = await axios.get(rating)
    res.status(200).send(rating_result.data)
})

//rating
app.post('/api/rating', async(req,res) =>{
    const rating_result = await axios.get(rating)
    res.status(200).json({rate: rating_result.data.ratings[0].rating});
});


//Top 10 movies all times 
app.post('/api/Top10Movies', async(req,res) =>{
    const Top10Movies_result = await axios.get(Top250Movies)
    let output = [];
    for (let i = 0; i < 10; i++ ){
        output.push(Top10Movies_result.data.items[i].title);
    }
    res.status(200).json(output);
});

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


//Top # movies's rating in theater
app.post('/api/movies', async(req, res) => {
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
    //addition

    let id = []
    // const searchTitle_result = await axios.get(searchTitle);
    for (let i = 0; i < output_titles.length; i++){
        const searchTitle = `https://imdb-api.com/en/API/SearchMovie/k_1s3ffptn/` + output_titles[i];
        const searchTitle_result = await axios.get(searchTitle);
        id.push(searchTitle_result.data.results[0].id);
    }

    let rates = []
    // const rating_result = await axios.get(rating)
    for (let j = 0; j < id.length; j++){
        const rating = `https://imdb-api.com/en/API/Ratings/k_1s3ffptn/`+id[j];
        const rating_result = await axios.get(rating)
        rates.push(rating_result.data.theMovieDb);
    }

    res.status(200).json({themovieDB_rating: rates});


    //res.send({titles: output_titles})

});

// user's mood and return related genre's movie in coming soon movies. 

app.post('/api/mood', async(req,res) =>{
    const mood = `https://imdb-api.com/en/API/ComingSoon/k_1s3ffptn`;
    const mood_result = await axios.get(mood)
    // let userInput = request.body.userMood
    let userInput = 'happy'
    let suggested_movie = []
    if (userInput.includes('happy', 'excited', 'joyful')){
        for(let i = 0; i < mood_result.data.items.length; i++){
            if (mood_result.data.items[i].genres.includes('Action', 'Comedy', 'Humor', 'Adventure', 'Family', 'Musical')){
                suggested_movie.push(mood_result.data.items[i].title)
            }
        }
    }
    else if (userInput.includes('sad', 'depressed')){
        for(let i = 0; j < mood_result.data.items.length; i++){
            if (mood_result.data.items[i].genres.includes('Romance', 'Drama')){
                suggested_movie.push(mood_result.data.items[i].title)
            }
        }
    }
    else if (userInput.includes('surprise', 'suspense', 'anxiety', 'dread', 'scare')){
        for(let i = 0; j < mood_result.data.items.length; i++){
            if (mood_result.data.items[i].genres.includes('Romance', 'Drama', 'Crime', 'Thriller', 'Adventure' )){
                suggested_movie.push(mood_result.data.items[i].title)
            }
        }
    }
    res.status(200).json(suggested_movie);
    
    //res.status(200).json({rate: rating_result.data.ratings[0].rating});
});

app.post('/api/trailers', async(req, res) => {
    const movie = "Venom"
    const link = `https://imdb-api.com/en/API/Search/k_1s3ffptn/${movie}`
    const id_result = await axios.get(link)
    const imbd_id = id_result.data.results[0].id
    

    const trailer_link = `https://imdb-api.com/en/API/Trailer/k_1s3ffptn/${imbd_id}`
    const t_result = await axios.get(trailer_link)
    const t_link = t_result.data.linkEmbed

    res.status(200).send(t_link)
})

app.post('/api/providers', async(req, res) => {
    let movie = "Venom"
    let link = `https://imdb-api.com/en/API/Search/k_1s3ffptn/${movie}`
    let id_result = await axios.get(link)
    let imbd_id = id_result.data.results[0].id
    

    let moviedb_link = `https://api.themoviedb.org/3/find/${imbd_id}?api_key=fe198c3817bf7eb40d02b4b22aacfe20&language=en-US&external_source=imdb_id`
    let moviedb_result = await axios.get(moviedb_link)
    let movie_id = moviedb_result.data.movie_results[0]
    let moviedb = String(movie_id["id"])

    let prov_link = 
    `https://api.themoviedb.org/3/movie/${moviedb}/watch/providers?api_key=fe198c3817bf7eb40d02b4b22aacfe20`
    let prov_result = await axios.get(prov_link)
    let prov = prov_result.data.results.US
    let provlink = prov.link

    let ls = []
    for(let i = 0; i < prov.buy.length; i+=1){
        console.log(prov.buy[i])
        ls.push(prov.buy[i].provider_name)
    }

    let links = {
        movie_db : provlink,
        providers : ls
    }
    res.status(200).send(links)

})


// https://prod.liveshare.vsengsaas.visualstudio.com/join?0C1A49C500DABBF6B36729E3DC331354F7F1


// //  "Spider-Man: No Way Home",
// "Nightmare Alley",
// "The Matrix Resurrections",
// "The King's Man"




//https://api-registration.movieglu.com/api_demo/#
// const api2 = await axios.get('https://api-gate2.movieglu.com/filmsComingSoon/?n=1',
// {
//     headers: {
//         'api-version': 'v200',
//         'Authorization': 'Basic Q0xBU181Om9XSk43cTRBYW5MbA==',
//         'x-api-key': 'BgZEPxa6um90WNuSakn294tMUSi3qRMW7tSqbTf9',
//         'device-datetime': '2021-12-06T04:03:41.621Z',
//         'territory': 'US',
//         'client': 'CLAS_5',
//         'geolocation': '42.3601;-71.0589'
//     }
//   }
// );



app.listen(port, () => console.log(`Listening on port ${port}`));