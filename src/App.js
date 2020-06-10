import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ControlPanel from './component/ControlPanel.js'
import ImageGallery from './component/ImageGallery.js'
import {inject} from 'mobx-react'


const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // overflow:'hidden',
    height:"100%"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  controlPanel:{
    float:"left",
    width: drawerWidth,
    flexShrink: 0,
    // overflow:"auto",
  },
  content: {
    float:"left",
    padding: theme.spacing(3),
    // overflow:"scroll",
  },
}));

export default inject('visImages')(function App() {
  const classes = useStyles();
  let imgList = [];


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
