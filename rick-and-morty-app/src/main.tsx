import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client';
import { EpisodeProvider } from './context/EpisodeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <EpisodeProvider>
        <App />
      </EpisodeProvider>
    </ApolloProvider>
  </React.StrictMode>
);
