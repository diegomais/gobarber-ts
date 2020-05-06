import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppProvider from './contexts';
import Routes from './routes';

import GlobalStyles from './styles/global';

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>
    <GlobalStyles />
  </Router>
);

export default App;
