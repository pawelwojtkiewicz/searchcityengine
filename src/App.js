import React from 'react';
import GlobalStyle from 'theme/GlobalStyle';
import SearchCitiesPage from 'views/SearchCitiesPage';
import { ToastProvider } from 'react-toast-notifications'

const App = () => (
  <ToastProvider>
    <GlobalStyle />
    <SearchCitiesPage />
  </ToastProvider>
);

export default App;