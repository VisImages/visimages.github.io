import React, {useState} from 'react';
import {
    makeStyles,
    Dialog,
    DialogContent,
    Typography,
    List,
    CircularProgress,
    Button, fade
} from "@material-ui/core";
import {ColorStyles, TextTranslate} from "../../store/Categories";
import {inject, observer} from "mobx-react";
import VisType from "./VisType";

const useStyles = makeStyles(theme => ({
    root: {},
    titlebar: {
        display: "flex",
        maxWidth: '50vw',
        justifyContent: 'space-between',
    },
    row: {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        width: "50vw",
    },
    imgView: {
        position: "relative",
        flex: 1,
        margin: theme.spacing(2, 0),
    },
    img: {
        position: "relative",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    recs: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden',
    },
    rec: {
        position: "absolute",
    },
    label: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: theme.spacing(0.5),
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        color: '#ffffff'
    },
    details: {
        position: "relative",
        width: "15vw",
        overflow: "scroll"
    },
    caption: {
        maxWidth: '50vw',
    }
}));

function DetailView({d, sys}) {
    const classes = useStyles();
    const boxes = d.boxes;
    const {title, url} = d.getPaperInfo(sys.detailedImg[0]);
    const {caption} = d.getImageInfo(sys.detailedImg[0], sys.detailedImg[1]);

    const [state, setState] = useState({
        dimensions: {
            height: 1,
            width: 1,
        },
        imgSize: [0, 0],
    })

    const onImgLoad = ({target: img}) => {
        const maxWidth = window.innerWidth * 0.35,
          maxHeight = window.innerHeight * 0.5;
        const scale = Math.min(maxHeight / img.naturalHeight, maxWidth / img.naturalWidth);
        setState({
            dimensions: {
                height: img.naturalHeight,
                width: img.naturalWidth,
            },
            imgSize: [scale * img.naturalWidth, scale * img.naturalHeight],
        });
    }

    const handleChange = indexes => {
        indexes.forEach(index => {
            const {visibility} = boxes[index];
            boxes[index].visibility = visibility === "visible" ? "hidden" : "visible";
        });
    };

    const categories = {};
    if (boxes !== null)
        boxes.forEach((box, index) => {
            if (!categories.hasOwnProperty(box.visType)) categories[box.visType] = [];
            categories[box.visType].push({index, ...box});
        });

    return <Dialog open={sys.detailView} onClose={sys.closeDetail} maxWidth={false}>
        <DialogContent>
            {boxes === null ?
              <CircularProgress/> :
              <div className={classes.root}>
                  <div className={classes.titlebar}>
                      <Typography variant={'h5'}>
                          {title}
                      </Typography>
                      <Button href={url} variant={"contained"}>Paper</Button>
                  </div>
                  <div className={classes.row}>
                      <div className={classes.imgView}
                           style={{width: state.imgSize[0], height: state.imgSize[1]}}>
                          <img className={classes.img}
                               src={sys.detailedImg[2]} alt={sys.detailedImg[2]}
                               onLoad={onImgLoad}
                               style={{width: state.imgSize[0], height: state.imgSize[1]}}/>
                          <div className={classes.recs}
                               style={{width: state.imgSize[0], height: state.imgSize[1]}}>
                              {boxes.map((value, index) => {
                                  return <div key={index}
                                              className={classes.rec}
                                              style={
                                                  {
                                                      left: `${100 * value.box[0] / state.dimensions.width}%`,
                                                      top: `${100 * value.box[1] / state.dimensions.height}%`,
                                                      width: `${100 * (value.box[2] - value.box[0]) / state.dimensions.width}%`,
                                                      height: `${100 * (value.box[3] - value.box[1]) / state.dimensions.height}%`,
                                                      backgroundColor: fade(ColorStyles[value.visType], 0.3),
                                                      visibility: value.visibility,
                                                  }}>
                                      <div className={classes.label}>{TextTranslate[value.visType]}</div>
                                  </div>
                              })}
                          </div>
                      </div>
                      <div className={classes.details} style={{height: state.imgSize[1]}}>
                          <List disablePadding>
                              {Object.keys(categories)
                                .sort((a, b) => categories[b].length - categories[a].length)
                                .map(visType => {
                                    return <VisType key={visType}
                                                    visType={visType} boxes={categories[visType]}
                                                    setVisible={handleChange}/>
                                })}
                          </List>
                      </div>
                  </div>

                  <Typography className={classes.caption}>{caption}</Typography>
              </div>}
        </DialogContent>
    </Dialog>
}

export default inject('d', 'sys')(observer(DetailView));
