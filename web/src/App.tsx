import React from 'react';

import GlobalStyles from './styles/global';
import SignIn from './pages/SignIn';

import { AuthProvider } from './contexts/auth';
import ToastContainer from './components/ToastContainer';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStyles />
    <ToastContainer />
  </>
);

export default App;
