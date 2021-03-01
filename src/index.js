import React from 'react';
import {ErrorBoundary} from 'react-error-boundary'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <ErrorBoundary>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ErrorBoundary>,
  document.getElementById('root')
);
