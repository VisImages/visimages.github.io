import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Slider from '@material-ui/core/Slider';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import {inject} from 'mobx-react'

const filter = createFilterOptions();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  element_holder: {
    width: '100%',
    padding: '10px 30px 10px 30px',
  },
  multi_select: {
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));


export default inject('visImages')(function ControlPanel({visImages}) {
  const classes = useStyles();
  // console.log(props.init_data)
  console.log(visImages.yearInterval)
  // const [yearValue, setYear] = React.useState(visImages.yearInt)
  // console.log(yearValue)
  const [paperName, setPaper] = React.useState(null);

  const [sstate, ssetState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  // const handelYear = (event, newValue) => {
  //   setYear(newValue)
  // }

  const handleChange = (event) => {
    ssetState({ ...sstate, [event.target.name]: event.target.checked });
  };

  function valuetext(value) {
    // console.log(typeof value)
    return `${value}`.slice(-2);
  }

  const { gilad, jason, antoine } = sstate;
  return (
    <div className={classes.root}>
      <div className={classes.element_holder} key = "vis-number">
        <Typography id="number-title" gutterBottom>
          Visualization Amount
        </Typography>
        <Typography id="number" align="center">
          {10000}
        </Typography>
        <Divider/>
      </div>
      <div className={classes.element_holder} key = "paper-input">
        <Autocomplete
          value={paperName}
          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              setPaper({
                title: newValue,
              });
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              setPaper({
                title: newValue.inputValue,
              });
            } else {
              setPaper(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            // Suggest the creation of a new value
            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                title: `Add "${params.inputValue}"`,
              });
            }

            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="free-solo-with-text-demo"
          options={visImages.paperList}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            // Regular option
            return option.title;
          }}
          renderOption={(option)=>{
            if (typeof option === 'string') {
              return option;
            }
            return option.title;
          }}
          style={{ width: 300 }}
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label="Paper title" variant="outlined" fontSize="2px"/>
          )}
        />
      </div>
      <div className={classes.element_holder} key = "year-slider">
        <Typography id="continuous-slider1" gutterBottom>
          Year
        </Typography>
        <Slider
          value={visImages.yearInt}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          // onChange={handelYear}
          getAriaValueText={valuetext}
          marks={[
            {
              value:visImages.yearInt[0],
              label:visImages.yearInt[0],
            },
            {
              value:visImages.yearInt[1],
              label:visImages.yearInt[1],
            }
          ]}
          min={visImages.yearInt[0]}
          max={visImages.yearInt[1]}
        />
      </div>
      <div className={classes.element_holder} key = "author-selector">
        <Autocomplete
          multiple
          id="tags-standard"
          options={visImages.authorList}
          // getOptionLabel={(option) => option.title}
          defaultValue={[]}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Authors"
            />
          )}
        />
      </div>
      <div className={classes.element_holder} key = "type-selector">
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Visualization types</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
              label="Line chart"
            />
            <FormControlLabel
              control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
              label="Scatterplot"
            />
          </FormGroup>
          <FormHelperText>Be careful</FormHelperText>
        </FormControl>
      </div>
    </div>
  );
})
