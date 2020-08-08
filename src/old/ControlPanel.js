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
import { TextTranslate } from './Categories'
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

let axios = require('axios')

const filter = createFilterOptions();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: "scroll",
    height: "100%",
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


export default inject('visImages')(observer(function ControlPanel({ visImages }) {
  const classes = useStyles();


  const handleYear = (event, newValue) => {
    visImages.yearInt = newValue;
    visImages.filterConditions["year"] = newValue;
    visImages.fetchFilteredData(true);
  }

  const handlePaper = (event, newValue) => {
    if (typeof newValue === 'string') {
      console.log("1", newValue);
      visImages.filterConditions["paperName"] = newValue;
    } else {
      console.log("3", newValue);
      visImages.filterConditions["paperName"] = newValue;
    }
    visImages.fetchFilteredData();
    // visImages.updateFetchUrls();
  }
  const handleAuthor = (event, newValue) => {
    visImages.filterConditions["authorName"] = newValue;
    visImages.fetchFilteredData();
  }

  const handleVisType = (event) => {
    if (event.target.name === "allTypes") {
      visImages.filterConditions.allTypes = !visImages.filterConditions.allTypes;
      if (visImages.filterConditions.allTypes){
        visImages.filterConditions.allAnnotated = false;
        visImages.filterConditions.visType = [];
      }
    }
    else if (event.target.name === "allAnnotated") {
      visImages.filterConditions.allAnnotated = !visImages.filterConditions.allAnnotated;
      if (visImages.filterConditions.allAnnotated){
        visImages.filterConditions.allTypes = false;
        visImages.filterConditions.visType = Object.keys(TextTranslate);
      }
      else{
        visImages.filterConditions.visType = [];
        visImages.filterConditions.allTypes = true;
      }
    }
    else {
      const { visType } = visImages.filterConditions;
      const index = visType.indexOf(event.target.name);
      if (index === -1) {
        visImages.filterConditions.visType.push(event.target.name);
        if (visImages.filterConditions.visType.length === 30){
          visImages.filterConditions.allAnnotated = true;
        }
        if(visImages.filterConditions.allTypes){
          visImages.filterConditions.allTypes = false;
        }
      }
      else {
        visImages.filterConditions.visType.splice(index, 1);
        if (visImages.filterConditions.allAnnotated){
          visImages.filterConditions.allAnnotated = false;
        }
        if (visImages.filterConditions.visType.length === 0){
          visImages.filterConditions.allTypes = true;
        }
      }
    }
    visImages.fetchFilteredData();
    // ssetState({ ...sstate, [event.target.name]: event.target.checked });
  };

  const checkedType = (visType) => {
    if (visType === "allTypes") return visImages.filterConditions.allTypes;
    else if (visType === "allAnnotated") return visImages.filterConditions.allAnnotated;
    else return visImages.filterConditions.visType.indexOf(visType) === -1 ? false : true;
  }

  console.log(visImages.filterConditions.year)
  return (
    <div className={classes.root}>
      <div className={classes.element_holder} key="vis-number">
        <Typography id="number-title" gutterBottom>
          Image Amount
        </Typography>
        <Typography id="number" align="center">
          {visImages.fetchedData.imgList.length}
        </Typography>
        <Divider />
      </div>
      <div className={classes.element_holder} key="paper-input">
        <Autocomplete
          value={visImages.filterConditions["paperName"]}
          onChange={handlePaper}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            return filtered;
          }}
          selectOnFocus={true}
          clearOnBlur
          handleHomeEndKeys
          id="free-solo-with-text-demo"
          options={visImages.fetchedData.paperList}
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
          renderOption={(option) => {
            if (typeof option === 'string') {
              return option;
            }
            return option.title;
          }}
          style={{ width: 300 }}
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label="Paper title" variant="outlined" fontSize="2px" />
          )}
        />
      </div>
      <div className={classes.element_holder} key="year-slider">
        <Typography id="continuous-slider1" gutterBottom>
          Year
        </Typography>
        <Slider
          value={visImages.yearInt}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          onChange={handleYear}
          marks={[
            {
              value: visImages.fetchedData.minYear,
              label: visImages.fetchedData.minYear,
            },
            {
              value: visImages.fetchedData.maxYear,
              label: visImages.fetchedData.maxYear,
            }
          ]}
          min={visImages.fetchedData.minYear}
          max={visImages.fetchedData.maxYear}
        />
      </div>
      <div className={classes.element_holder} key="author-selector">
        <Autocomplete
          multiple
          id="tags-standard"
          options={visImages.fetchedData.authorList}
          onChange={handleAuthor}
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
      <div className={classes.element_holder} key="type-selector">
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Visualization types</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={checkedType("allTypes")} onChange={handleVisType} name={"allTypes"} />}
              label={"all images"}
            />
            <FormControlLabel
              control={<Checkbox checked={checkedType("allAnnotated")} onChange={handleVisType} name={"allAnnotated"} />}
              label={"all annotated images"}
            />
            {
              Object.keys(TextTranslate).map((value, index) => {
                return (<FormControlLabel
                  control={<Checkbox checked={checkedType(value)} onChange={handleVisType} name={value} />}
                  label={TextTranslate[value]}
                />)
              })
            }
          </FormGroup>
        </FormControl>
      </div>
    </div>
  );
}))
