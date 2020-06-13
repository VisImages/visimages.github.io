import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
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

const styles = theme => ({
  root: {
    display:"flex",
    flexDirection:"column",
    justify:"center",
  },
  gallery: {
    display:"flex",
    height:"95%",
    margin:0,
  },
  pagenum: {
    display:"block",
    // height:"5%",
  },
  card: {
    maxWidth: 250,
    height: "20vh",
    margin: 5,
  },
  media: {
    height:140,
  },
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

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.gallery}>
          {/* <Grid container> */}
          {visImages.fetchUrls.map((value, index) => {
            // console.log(value)
            return (
            <Card item className={classes.card}
              key={index}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={value}
                />
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
            </Button>
                <Button size="small" color="primary">
                  Learn More
            </Button>
              </CardActions>
            </Card>
          )})}
        {/* </Grid> */}
        </div>
        <div className={classes.pagenum}>
          <Pagination
            page={visImages.pageNum}
            count={Math.floor(
              visImages.filteredList.imgList.length / visImages.showNum)}
            onChange={this.handlePage}/>
        </div>
      </div>)
  };
}

export default withStyles(styles)(ImageGallery);