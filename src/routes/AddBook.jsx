import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import { DateField } from '@mui/x-date-pickers/DateField';
import useAxios from '../services/useAxios';
import { bookGenres } from '../genres';
import { Stack, Typography } from '@mui/material';

function AddBook() {
  const {alert, post}= useAxios('http://localhost:3000');
  //book rating
  const [rateValue, setRateValue] = useState(3);
  const [book, setBook] = useState({
    author: '',
    name: '',
    genres: [],
    completed: false,
    start: null,
    end: null,
    stars: null,
    img: "https://media.istockphoto.com/id/949118068/photo/books.jpg?s=170667a&w=0&k=20&c=qU_DMsr0Lu-nk3Cv5Cm-K4wadNslfyTLyQQFtW34Sdw="
  });

  console.log(book.img);

  const genreChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,//to select multiple genres
      genres: typeof value === 'string' ? value.split(',') : value,//to split the genres using a comma
    });
  };

  // Function to handle changes in the rating input
  const rateChangeHandler = (event) => {
    const { value } = event.target;
      // Update the 'stars' property in the 'book' state with the new value
    setBook({
      ...book,
      stars: value,
    });
  };

  const addBookHandler = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === 'checkbox' && name === 'completed') {
      setBook({ ...book, [name]: checked });
    } else {
      setBook({ ...book, [name]: value });
    }
  };
//fixed timeout
  function postHandler(e) {
    post('books', book);
    e.preventDefault();
  }//to post data to an endpoint
 

  return (
    <form onChange={addBookHandler} onSubmit={postHandler}>
      <Stack
        spacing={1}
        alignItems="stretch"
        sx={{ my: 2, mx: 'auto', width: '25%' }}
      >
        {alert.show && <Alert severity={alert.type}>{alert.message} 
        </Alert>}
        
        <Typography variant="h4" component="h2" sx={{ my: 10 }}>
          Add a book
        </Typography>
        <TextField
          name="name"
          id="outlined-basic"
          label="Title"
          variant="outlined"
        />
        <TextField
          name="author"
          id="outlined-basic"
          label="Author"
          variant="outlined"
        />
        <TextField
          name="img"
          id="outlined-basic"
          label="Image (url)"
          variant="outlined"
        />
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={book.genres}
          name="genres"
          onChange={genreChangeHandler}
          input={<OutlinedInput label="Genre" />}
        >
          {bookGenres.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>

        <FormControlLabel
          name="completed"
          control={<Checkbox checked={book.completed} />}
          label="Completed"
        />

        <DateField name="start" label="Started" />
        <DateField name="end" label="Finished" disabled={!book.completed} />
        <Stack spacing={1}>
          <Rating
            name="stars"
            value={rateValue}
            onClick={rateChangeHandler}
            size="large"
            onChange={(event, newValue) => {
              setRateValue(newValue);
            }}
          />
        </Stack>
        <Button variant="contained" type="submit">
          Add new
        </Button>
      </Stack>
    </form>
  );
}

export default AddBook;
