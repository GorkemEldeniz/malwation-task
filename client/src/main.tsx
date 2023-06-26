import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/reset.css';
import './styles/global.css';
import { store } from './store/index.ts';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
