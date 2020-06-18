import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {ColorStyles} from './Categories';
import { inject, observer } from 'mobx-react';
import visImages from '../store';



const styles = theme => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    // zIndex: 3,
    width: "100%",
    height: "100%",
  },
  imgView: {
    position: "relative",
    width: "60%",
    height:"fit-content",
  },
  img: {
    // display: "flex",
    position: "relative",
    width: "100%",
    // maxWidth: "80%",
  },
  rec: {
    position: "absolute",
    opacity: "0.3",
  },
  details: {
    padding:"20px",
    display: "flex",
    flexDirection:"column",
    justify:"between-center",
    flexWrap:"wrap",
    position: "relative",
    width: "40%",
    height:"600px",
    overflow:"scroll"
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
      }
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
        width: img.naturalWidth
      }
    });
  }
  handleChange = (value) =>{
    console.log(value.index);
    const {visibility} = visImages.detailInfo[value.index];
    visImages.detailInfo[value.index].visibility = visibility==="visible"?"hidden":"visible";
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
                      left: `${100*value.box[0]/this.state.dimensions.width}%`,
                      top: `${100*value.box[1]/this.state.dimensions.height}%`,
                      width: `${100*(value.box[2]-value.box[0])/this.state.dimensions.width}%`,
                      height: `${100*(value.box[3]-value.box[1])/this.state.dimensions.height}%`,
                      backgroundColor:ColorStyles[value.visType],
                      visibility:value.visibility,
                    }}
                />)
            })}
        </div>
        <div className={classes.details}>
          <Typography>
            Visualizations:
          </Typography>
          <FormGroup>
            {
              visImages.detailInfo.map((value, index) => {
                return (<FormControlLabel
                  control={<Checkbox
                    checked={value.visibility==="visible"?true:false}
                    style={
                      {
                        color:ColorStyles[value.visType],
                      }}
                    onChange={this.handleChange.bind(this,{index:index})}
                    index={index}
                    name={value.visType} />}
                  label={value.visType}
                />)
              })}
          </FormGroup>
        </div>
      </div>
    )
  };
}

export default withStyles(styles)(DetailView);