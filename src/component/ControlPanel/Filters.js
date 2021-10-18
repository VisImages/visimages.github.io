import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { VariableSizeList } from 'react-window';
import {makeStyles, Checkbox, TextField} from "@material-ui/core";
import {CheckBoxOutlineBlank, CheckBox} from '@material-ui/icons';
import {Autocomplete} from "@material-ui/lab";
import {inject, observer} from "mobx-react";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1, 1, 1),
        flex: '0 0 fit-content'
    },
    autocomplete: {
        marginTop: theme.spacing(1),
    }
}));

const icon = <CheckBoxOutlineBlank fontSize="small"/>;
const checkedIcon = <CheckBox fontSize="small"/>;

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const itemCount = itemData.length;
  const itemSize = 36;

  const getChildSize = (child) => {
    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

function Filters({title, value, d}) {
    const classes = useStyles();
    const [val, setVal] = useState('');

    const allFilters = d[`all${value}`];


    return <div className={classes.root}>
        <Autocomplete
          disabled={d.barSelected} 
          className={classes.autocomplete}
          multiple
          size={'small'}
          options={allFilters}
          // filterOptions={options => options
          //   .filter(option => option.toLowerCase().includes(val.toLowerCase()))
          //   .filter((_, i) => i < 20)}
          onChange={(e, newValue) => {
              d.updateFilter(value, newValue)
          }}
          ListboxComponent={ListboxComponent}
          disableCloseOnSelect
          renderOption={(option, {selected}) => (
            <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{marginRight: 8}}
                  checked={selected}
                />
                {option}
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label={title} onChange={(e) => setVal(e.target.value)}/>
          )}
        />
    </div>
}

export default inject('d')(observer(Filters));
