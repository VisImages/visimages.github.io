import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import { ColorStyles, TextTranslate } from './Categories';
import { inject, observer } from 'mobx-react';
import visImages from '../store';



const styles = theme => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    // zIndex: 3,
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
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
});

@inject("visImages")
@observer
class DetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: {
        height: 1,
        width: 1,
      },
      imgHeight:0,
    };
    this.onImgLoad = this.onImgLoad.bind(this);
  }
  onImgLoad({ target: img }) {
    console.log(img.naturalHeight);
    console.log(img.naturalWidth);
    console.log(this.state.dimensions)
    this.setState({
      dimensions: {
        height: img.naturalHeight,
        width: img.naturalWidth,
      },
      imgHeight: img.clientHeight
    });
  };

  handleRec = (event, value) => {
    console.log(event);
    console.log(value);
  };

  handleChange = (value) => {
    console.log(value.index);
    const { visibility } = visImages.detailInfo[value.index];
    visImages.detailInfo[value.index].visibility = visibility === "visible" ? "hidden" : "visible";
    console.log(visImages.detailInfo);
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.imgView}>
          <img
            className={classes.img}
            src={visImages.detailUrl}
            onLoad={this.onImgLoad}>
          </img>
          {
            visImages.detailInfo.map((value, index) => {
              return (
                <div
                  className={classes.rec}
                  style={
                    {
                      left: `${100 * value.box[0] / this.state.dimensions.width}%`,
                      top: `${100 * value.box[1] / this.state.dimensions.height}%`,
                      width: `${100 * (value.box[2] - value.box[0]) / this.state.dimensions.width}%`,
                      height: `${100 * (value.box[3] - value.box[1]) / this.state.dimensions.height}%`,
                      backgroundColor: ColorStyles[value.visType],
                      visibility: value.visibility,
                    }}
                  onClick={this.handleRec}
                />)
            })}
        </div>
        <div className={classes.details} style = {{height:this.state.imgHeight}}>
          <Typography variant="h6" className={classes.title}>
            Visualizations:
          </Typography>
          <List>
            {
              visImages.detailInfo.map((value, index) => {
                const labelId = `checkbox-list-label-${index}`;
                return(<ListItem key={index} role={undefined} dense button onClick={this.handleChange.bind(this, { index: index })}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={value.visibility === "visible" ? true : false}
                      tabIndex={-1}
                      style={
                              {
                                color: ColorStyles[value.visType],
                              }}
                      disableRipple
                      // onChange={this.handleChange.bind(this, { index: index })}
                      index={index}
                      label={TextTranslate[value.visType]}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={TextTranslate[value.visType]} />
                  {/* <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                      <CommentIcon />
                    </IconButton>
                  </ListItemSecondaryAction> */}
                </ListItem>)
                // return (<FormControlLabel
                //   control={<Checkbox
                //     checked={value.visibility === "visible" ? true : false}
                //     style={
                //       {
                //         color: ColorStyles[value.visType],
                //       }}
                //     onChange={this.handleChange.bind(this, { index: index })}
                //     index={index}
                //     name={value.visType} />}
                //   label={TextTranslate[value.visType]}
                // />)
              })}
          </List>
        </div>
      </div>
    )
  };
}

export default withStyles(styles)(DetailView);