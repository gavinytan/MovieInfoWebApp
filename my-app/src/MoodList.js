import { FormControlLabel } from '@mui/material'
import { FormGroup } from '@mui/material'
import { Checkbox } from '@mui/material';

function MoodList(props) {
    const genres = props.genres;
  const genreCheckBoxes = genres.map((genre) => 
    <FormControlLabel control={<Checkbox />} label={genre} />
  );
  return  (
      <FormGroup>{genreCheckBoxes}</FormGroup>
  );
}

export default MoodList;