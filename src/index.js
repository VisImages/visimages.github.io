import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import visImages from './store';
import {Provider} from 'mobx-react'


ReactDOM.render(<Provider visImages={visImages}>
            <App />
        </Provider>, document.querySelector('#root'));
