/*
TODO:
- Add mood selection form/dropdown
- Match moods to genres
- Pass genres to API call
*/

import './App.css';
import * as React from 'react';
import { FormControlLabel } from '@mui/material'
import { FormGroup } from '@mui/material'
import { Checkbox } from '@mui/material';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { Card } from '@mui/material';
function App() {
  const [state, setState] = React.useState({
    angry: false,
    anxious: false,
    calm: false,
    excited: false,
    happy: false,
    lonely: false,
    sad: false,
    serious: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    console.log(event.target.name);
    console.log(state);
  };


  const genreCheckBoxes = Object.keys(state).map((mood) => 
    <FormControlLabel control={<Checkbox checked={state[mood]} onChange={handleChange}/>}label={mood} name={mood} key={mood}/>
  );
  return (
    <div className="App">
      <Grid container justifyContent="center" xs={12}>
      <Card variant="outlined" sx={{ minWidth: 250 }}>
          <FormGroup>{genreCheckBoxes}</FormGroup>
          <Button variant="contained">Search</Button>
      </Card>
      </Grid>
    </div>
  );
}

export default App;
