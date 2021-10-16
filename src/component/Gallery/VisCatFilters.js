import React, {useState} from 'react';
import {
    makeStyles,
    Typography,
    Checkbox,
    TextField
} from "@material-ui/core";
import {TextTranslate, ReverseTextTranslate} from "../../store/Categories";
import {inject, observer} from "mobx-react";
import {Autocomplete} from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectAll: {
        padding: 0,
    },
    title: {
        margin: theme.spacing(0, 1),
    },
    autocomplete: {
        minWidth: '300px',
        maxWidth: '40vw',
    },
    chip: {
        margin: theme.spacing(0.5),
    }
}));

function VisCatFilters({d}) {
    const classes = useStyles();
    const [val, setVal] = useState('');

    const allFilters = d.allCategories;
    const filteredFilters = [];
    let moreCnt = 0;
    for (const optionalValue of allFilters) {
        if (optionalValue.includes(val)) {
            filteredFilters.push(optionalValue);
            moreCnt += 1;
        }
        if (moreCnt === 20) break;
    }

    return <div className={classes.root}>
        <Checkbox
          className={classes.selectAll}
          checked={d.filterCategories.length === d.allCategories.length}
          indeterminate={d.filterCategories.length > 0 && d.filterCategories.length < d.allCategories.length}
          onChange={(e, checked) => {
              d.updateFilterCategories(checked ? d.allCategories : []);
          }}/>
        <Typography className={classes.title}>Vis. Categories: </Typography>
        <Autocomplete
          className={classes.autocomplete}
          multiple
          size={'small'}
          limitTags={3}
          options={filteredFilters.map(t => TextTranslate[t])}
          value={d.filterCategories.map(t => TextTranslate[t])}
          onChange={(e, newValue) => {
              d.updateFilterCategories(newValue.map(t => ReverseTextTranslate[t]))
          }}
          disableCloseOnSelect
          renderOption={(option, {selected}) => (
            <React.Fragment>
                <Checkbox
                  style={{marginRight: 8}}
                  checked={selected}
                />
                {option}
            </React.Fragment>
          )}
          renderInput={(params) => {
            //   console.log(params);
              return <TextField {...params}
              InputProps={
                  {
                      ...params.InputProps,
                      startAdornment: params.InputProps.startAdornment.filter((_, i) => i < 3)
                  }
              }
              onChange={(e) => setVal(e.target.value)}>
                </TextField>
          }}
        />
    </div>
}

export default inject('d')(observer(VisCatFilters));
