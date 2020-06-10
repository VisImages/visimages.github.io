import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { inject, observer } from 'mobx-react';
import visImages from '../store';
// import Minio from 'minio'


var Minio = require('minio')

var minioClient = new Minio.Client({
  endPoint: 'minio.zjvis.org',
  accessKey: 'ZWUkouAYfWR5ycxc1LL8Mbp0d02yqDnrJHSKh0sN0javzWZ79KcIVY53ns78pCYW',
  secretKey: 'l5sKx2Bmuqv308ZtzkhaPSlgscUezpJrtBOH1mICnKCW6FfrCPZa6KDrV8zp5aAM#'
});

// console.log(minioClient.getObject('visdata', 'images/1032/3.png'))

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gallery: {
    // flexGrow: 1,
    margin:30,
  },
  pagenum: {
    
  },
  card: {
    maxWidth: 250,
    margin: 5,
  },
  media: {
    height: 140,
  },
});

@inject("visImages")
@observer
class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { urls: [] };
  }

  componentDidMount() {
    // var temurls = []
    console.log(visImages.filteredList.imgList.length)
    const imgList = visImages.filteredList.imgList;
    for (let i = 0;
      i < 5;
      i++) {
      let [paperId, imgId] = "3100_00".split('_')
      // console.log(paperId, imgId)
      paperId = parseInt(paperId)
      imgId = parseInt(imgId)
      minioClient.presignedUrl('GET', 'visdata', `images/${paperId}/${imgId}.png`, 24 * 60 * 60,
        (err, presignedUrl) => {
          const { urls } = this.state;
          urls.push(presignedUrl)
          this.setState({ urls: urls })
        })
    }
    // console.log("temp",temurls)

  }
  render() {
    const { classes } = this.props;
    const { urls } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.gallery}><Grid
          container
          justify="space-between"
          spacing={5}
        >
          {urls.map((value, index) => (
            <Card className={classes.card}
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
          ))}
        </Grid>
        </div>
        <div className={classes.pagenum}>
            <Typography align="center">
              {"pageNum"}
            </Typography>
        </div>
      </div>)
  };
}

export default withStyles(styles)(ImageGallery);