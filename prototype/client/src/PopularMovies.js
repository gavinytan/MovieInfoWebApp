import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

class PopularMovies extends Component {
    state = {
        movie_titles: [],
        number: 10,
    };
    getMovies = async e => {
        e.preventDefault();
        const response = await fetch('/api/movie',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ number: this.state.number }),
            });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        this.setState({ movie_titles: body.titles })
    }
    render() {
        return (
            <Card>
                <CardContent>
                    <Stack spacing={2}>
                        <Typography variant="h6">
                            Popular Movies
                        </Typography>
                        <TextField
                            label="Number"
                            type="number"
                            variant="filled"
                            value={this.state.number}
                            onChange={(e) => this.setState({ number: e.target.value })}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Button variant="contained" onClick={this.getMovies}>Search</Button>
                        <Typography variant="h6">
                            {this.state.movie_titles.map((title) => <div key={title}>{title}</div>)}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        );
    }
}

export default PopularMovies;