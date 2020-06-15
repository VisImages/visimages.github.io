import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ControlPanel from './component/ControlPanel.js'
import ImageGallery from './component/ImageGallery.js'
import { sizing } from '@material-ui/system';
import {inject} from 'mobx-react'


const drawerWidth = 350;
const barHeight = 64;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // overflow:'hidden',
    height:"100%"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height:barHeight,
  },
  content:{
    position:"absolute",
    display:"flex",
    width:"100%",
    height:`calc(100% - ${barHeight}px)`,
  },
  controlPanel:{
    display:"block",
    width: drawerWidth,
    height:"100%",
    overflow:"scroll"
  },
  gallery: {
    display:"block",
    height:"100%",
    overflow:"scroll"
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
      <div>
        <Toolbar height={barHeight}/>
        <div className={classes.content}>
          <ControlPanel className={classes.controlPanel}/>
          <ImageGallery className={classes.gallery}/>
          </div>
      </div>
    </div>
  );
})
