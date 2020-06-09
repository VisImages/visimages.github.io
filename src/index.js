import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
<<<<<<< HEAD
import visImages from './store';
import {Provider} from 'mobx-react'
=======
>>>>>>> 76293843318c041adce91ae18f8b16fd7c2b025c


ReactDOM.render(<Provider visImages={visImages}>
            <App />
        </Provider>, document.querySelector('#root'));
