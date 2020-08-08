import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import store from './store';
import {Provider} from 'mobx-react'
import {MuiThemeProvider} from "@material-ui/core";


ReactDOM.render(<Provider visImages={store.visImages} sys={store.sys} d={store.d}>
    <MuiThemeProvider theme={store.sys.theme}>
        <App/>
    </MuiThemeProvider>
</Provider>, document.querySelector('#root'));
