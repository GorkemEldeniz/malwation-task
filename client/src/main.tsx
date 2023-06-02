import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/reset.css';
import './styles/global.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { store } from './store/index.ts';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
)
