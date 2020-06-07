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
// import Minio from 'minio'


var Minio = require('minio')

var minioClient = new Minio.Client({
  endPoint: 'minio.zjvis.org',
  accessKey: 'ZWUkouAYfWR5ycxc1LL8Mbp0d02yqDnrJHSKh0sN0javzWZ79KcIVY53ns78pCYW',
  secretKey: 'l5sKx2Bmuqv308ZtzkhaPSlgscUezpJrtBOH1mICnKCW6FfrCPZa6KDrV8zp5aAM#'
});

// console.log(minioClient.getObject('visdata', 'images/1032/3.png'))

var res = minioClient.presignedUrl('GET',
  'visdata', 'images/1032/3.png', 24 * 60 * 60, function (err, presignedUrl) {
    if (err) return console.log(err)
    return presignedUrl
  })

console.log(res)

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 250,
    margin: 5,
  },
  media: {
    height: 140,
  },
});

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { urls: [] };
  }

  componentDidMount() {
    // var temurls = []
    // console.log(this.props.imgList.length)
    for (var i = 1250; i < 1300; i++) {
      let [paperId, imgId] = this.props.imgList[i].imgName.split('.')[0].split('_')
      console.log(paperId, imgId)
      paperId = parseInt(paperId)
      imgId = parseInt(imgId)
      minioClient.presignedUrl('GET', 'visdata', `images/${paperId}/${imgId}.png`, 24 * 60 * 60,
        (err, presignedUrl) => {
          const {urls} = this.state;
          urls.push(presignedUrl)
          this.setState({ urls: urls })

        })
    }
    // console.log("temp",temurls)

  }
  render() {
    const {classes} = this.props;
    const {urls} = this.state;

    return (<Grid container justify="space-between" spacing={50}>
      {urls.map((value) => (
        <Card className={classes.card}>
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
    </Grid>)
  };
}

export default withStyles(styles)(ImageGallery);