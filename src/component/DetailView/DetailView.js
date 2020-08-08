import React, {useState} from 'react';
import {
    makeStyles,
    Dialog,
    DialogContent,
    Typography,
    List,
    CircularProgress,
    ListItem,
    ListItemIcon,
    ListItemText,
    Checkbox
} from "@material-ui/core";
import {ColorStyles, TextTranslate} from "../../store/Categories";
import {inject, observer} from "mobx-react";

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        // zIndex: 3,
        alignItems: "flex-start",
        width: "50vw",
        height: "50vh",
    },
    imgView: {
        display: "block",
        position: "relative",
        width: "60%",
        height: "fit-content",
    },
    img: {
        // display: "flex",
        position: "relative",
        width: "100%",
        // maxWidth: "80%",
    },
    title: {
        margin: theme.spacing(1, 0, 1),
    },
    rec: {
        position: "absolute",
        opacity: "0.3",
    },
    details: {
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "40%",
        overflow: "scroll"
    }
}));

function DetailView({d, sys}) {
    const classes = useStyles();
    const boxes = d.boxes;

    const [state, setState] = useState({
        dimensions: {
            height: 1,
            width: 1,
        },
        imgHeight: 0,
    })

    const onImgLoad = ({target: img}) => {
        setState({
            dimensions: {
                height: img.naturalHeight,
                width: img.naturalWidth,
            },
            imgHeight: img.clientHeight
        });
    }

    const handleChange = index => {
        const {visibility} = boxes[index];
        boxes[index].visibility = visibility === "visible" ? "hidden" : "visible";
    };

    return <Dialog open={sys.detailView} onClose={sys.closeDetail} maxWidth={false}>
        <DialogContent>
            {boxes === null ?
              <CircularProgress/> :
              <div className={classes.root}>
                  <div className={classes.imgView}>
                      <img
                        className={classes.img}
                        src={sys.detailedImg[2]} alt={sys.detailedImg[2]}
                        onLoad={onImgLoad}/>
                      {boxes.map((value, index) => {
                          return <div
                            key={index}
                            className={classes.rec}
                            style={
                                {
                                    left: `${100 * value.box[0] / state.dimensions.width}%`,
                                    top: `${100 * value.box[1] / state.dimensions.height}%`,
                                    width: `${100 * (value.box[2] - value.box[0]) / state.dimensions.width}%`,
                                    height: `${100 * (value.box[3] - value.box[1]) / state.dimensions.height}%`,
                                    backgroundColor: ColorStyles[value.visType],
                                    visibility: value.visibility,
                                }}
                          />
                      })}
                  </div>
                  <div className={classes.details} style={{height: state.imgHeight}}>
                      <Typography variant="h6" className={classes.title}>
                          Visualizations:
                      </Typography>
                      <List>
                          {
                              boxes.map((value, index) => {
                                  const labelId = `checkbox-list-label-${index}`;
                                  return (<ListItem key={index} role={undefined} dense button
                                                    onClick={() => handleChange(index)}>
                                      <ListItemIcon>
                                          <Checkbox
                                            edge="start"
                                            checked={value.visibility === "visible"}
                                            tabIndex={-1}
                                            style={
                                                {
                                                    color: ColorStyles[value.visType],
                                                }}
                                            disableRipple
                                            index={index}
                                            label={TextTranslate[value.visType]}
                                          />
                                      </ListItemIcon>
                                      <ListItemText id={labelId} primary={TextTranslate[value.visType]}/>
                                  </ListItem>)

                              })}
                      </List>
                  </div>
              </div>}
        </DialogContent>
    </Dialog>
}

export default inject('d', 'sys')(observer(DetailView));
