import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ControlPanel from './component/ControlPanel.js'
import ImageGallery from './component/ImageGallery.js'
import imgData from './data/visimages_data.json'
import authorNames from './data/authors.json'
import paperInfo from './data/visimage_paper_info.json'
<<<<<<< HEAD
import {inject} from 'mobx-react'
=======
import Store from "./store"
>>>>>>> 76293843318c041adce91ae18f8b16fd7c2b025c


const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  controlPanel:{
    width: drawerWidth,
    flexShrink: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default inject('visImages')(function App() {
  // const data = this.props.dataStore
  const classes = useStyles();
  let imgList = [];
  let paperList = [];
  let yearIndex = {};
  var paperCount = 0;
  var imgCount = 0
  let minYear = 10000
  let maxYear = 0
  // for (const paper in imgData) {
  //   for (const img in imgData[paper]) {
  //     imgList.push({
  //       imgName:imgData[paper][img]["file_name"],
  //     })
  //   };dataStore
  //   imgList:imgList,
  //   paperList:paperList,
  // };
  // console.log(visImages)


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            VisImages Explorer
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.controlPanel}>
      <Toolbar/>
        <ControlPanel/>
      </div>
      <main className={classes.content}>
        <Toolbar />
        <ImageGallery imgList={imgList}/>
      </main>
    </div>
  );
})
