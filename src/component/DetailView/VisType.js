import React from 'react';
import {makeStyles, ListItem, Collapse, List, ListItemText, ListItemIcon, Checkbox, IconButton} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import {inject, observer} from "mobx-react";
import {ColorStyles, TextTranslate} from "../../store/Categories";

const useStyles = makeStyles(theme => ({
    root: {},
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function VisType({visType, boxes, setVisible}) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const checked = boxes.reduce((previousValue, currentValue) => previousValue && currentValue.visibility === "visible", true);
    const indeterminate = !checked && boxes.reduce((previousValue, currentValue) => previousValue || currentValue.visibility === "visible", false);

    const handleChangeAll = () => {
        if (checked) setVisible(boxes.map(box => box.index));
        else setVisible(boxes.filter(box => box.visibility !== 'visible').map(box => box.index))
    };
    const handleChange = idx => {
        setVisible([idx]);
    };

    return <React.Fragment>
        <ListItem>
            <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked}
                  indeterminate={indeterminate}
                  tabIndex={-1}
                  style={{color: ColorStyles[visType]}}
                  onClick={handleChangeAll}
                  disableRipple
                />
            </ListItemIcon>
            <ListItemText primary={`${TextTranslate[visType]}(${boxes.length})`}/>
            <IconButton>
                {open ?
                  <ExpandLess onClick={() => setOpen(false)}/> :
                  <ExpandMore onClick={() => setOpen(true)}/>}
            </IconButton>
        </ListItem>
        <Collapse in={open} timeout={'auto'} unmountOnExit>
            <List component={'div'} disablePadding>
                {boxes.map((box, bid) => {
                    return <ListItem className={classes.nested}>
                        <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={box.visibility === "visible"}
                              onClick={() => handleChange(box.index)}
                              tabIndex={-1}
                              style={{color: ColorStyles[visType]}}
                              disableRipple
                            />
                        </ListItemIcon>
                        <ListItemText primary={bid + 1}/>
                    </ListItem>
                })}
            </List>
        </Collapse>
    </React.Fragment>
}

export default inject()(observer(VisType));
