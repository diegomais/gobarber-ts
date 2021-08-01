import React from 'react';

import { AuthProvider } from './auth';

type AppProviderProps = {
  children: React.ReactNode,
};

const AppProvider = ({ children }: AppProviderProps) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;
