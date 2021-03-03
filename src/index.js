import React from 'react';
import {ErrorBoundary} from 'react-error-boundary'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

ReactDOM.render(
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ErrorBoundary>,
  document.getElementById('root')
);
