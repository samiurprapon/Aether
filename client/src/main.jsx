import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import './index.css'
import store from './store/store';
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>
)
