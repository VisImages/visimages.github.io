import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Pagination from '@material-ui/lab/Pagination';
import { inject, observer } from 'mobx-react';
import visImages from '../store';
// import Minio from 'minio'


var Minio = require('minio');

var minioClient = new Minio.Client({
  endPoint: 'minio.zjvis.org',
  accessKey: 'ZWUkouAYfWR5ycxc1LL8Mbp0d02yqDnrJHSKh0sN0javzWZ79KcIVY53ns78pCYW',
  secretKey: 'l5sKx2Bmuqv308ZtzkhaPSlgscUezpJrtBOH1mICnKCW6FfrCPZa6KDrV8zp5aAM#'
});

// console.log(minioClient.getObject('visdata', 'images/1032/3.png'))
const marginImage = "15px";
const widthNum = 10;
const heightNum  = 8;


const styles = theme => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  gallery: {
    display: "flex",
    flexWrap: "wrap",
    height: "95%",
    // maxHeight:"95%",
  },
  card: {
    height: `calc(100% / ${heightNum} - 2 * ${marginImage})`,
    width: `calc(100% / ${widthNum} - 2 * ${marginImage})`,
    margin: marginImage,
    zIndex: 0,
  },
  media: {
    width: 300,
    height: 300,
  },
  pagenum: {
    display: "flex",
    justifyContent: "center",
    height: "5%",
  },
  backgroundShade:{
    position:"absolute",
    left:0,
    top:0,
    zIndex: 1,
    width:"100%",
    height:"100%",
    opacity:0.5,
    backgroundColor: "black",
  },
  detailView: {
    display: "block",
    position: "absolute",
    left: "25%",
    top: "20%",
    zIndex: 2,
    // maxHeight: "50%",
    width: "50%",
    backgroundColor: "yellow",
  }
});

@inject("visImages")
@observer
class ImageGallery extends React.Component {

  handlePage = (event, page) => {
    console.log(page);
    visImages.pageNum = page;
    visImages.showList = visImages.filteredList.imgList.slice(
      visImages.showNum * page,
      Math.min(
        visImages.filteredList.imgList.length,
        visImages.showNum * (page + 1))
    );
    visImages.updateFetchUrls();
  };

  handleClick = (value) => {
    // console.log("id", value);
    // console.log(visImages.getBoundingBoxes(value.pid, value.iid))
    visImages.detailOn = !visImages.detailOn;
    visImages.detailurl = value.url;
  };

  handleRestore = (value) => {
    visImages.detailOn = !visImages.detailOn;
  };

  render() {
    const { classes } = this.props;
    let handleClick = this.handleClick;

    return (
      <div className={classes.root}>
        {visImages.detailOn && 
        <div className={classes.backgroundShade} onClick = {this.handleRestore}/>}
        {visImages.detailOn && 
        <img className={classes.detailView} src={visImages.detailurl}/>}
        <div className={classes.gallery}>
          {/* <Grid container> */}
          {visImages.fetchUrls.map((value, index) => {
            // console.log(value)
            return (
              <Card item className={classes.card}
                key={index}>
                <CardActionArea>
                  <CardMedia
                    id={index}
                    className={classes.media}
                    image={value.url}
                    onClick={this.handleClick.bind(this,value)}
                  />
                </CardActionArea>
              </Card>
            )
          })}
          {/* </Grid> */}
        </div>
        <div className={classes.pagenum}>
          <Pagination
            page={visImages.pageNum}
            count={Math.floor(
              visImages.filteredList.imgList.length / visImages.showNum)}
            onChange={this.handlePage} />
        </div>
      </div>)
  };
}

export default withStyles(styles)(ImageGallery);