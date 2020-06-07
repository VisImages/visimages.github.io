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
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import imgData from './data/visimages_data.json'
import authorNames from './data/authors.json'
import paperInfo from './data/visimage_paper_info.json'


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

export default function App() {
  const classes = useStyles();
  let imgList = [];
  let paperList = [];
  for (const paper in imgData) {
    for (const img in imgData[paper]) {
      imgList.push({
        imgName:imgData[paper][img]["file_name"],
      })
    };
    paperList.push(paperInfo[paper]['title'])
  }
  let init_data = {
    year:[1990,2018],
    authors:authorNames,
    imgList:imgList,
    paperList:paperList,
  };
  // console.log(init_data)
  // for (idx = 0; i < )


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
        <ControlPanel init_data = {init_data}/>
      </div>
      <main className={classes.content}>
        <Toolbar />
        <ImageGallery imgList={imgList}/>
      </main>
    </div>
  );
}
