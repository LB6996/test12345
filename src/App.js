import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { Route } from 'react-router-dom';

import Homepage from './pages/Homepage'
import Navigator from './containers/Navigator'
import UserProfilePage from './pages/UserProfilePage'
import UserImages from './containers/UserImages'

function App() {
  return (
    <>
      <ToastContainer />
      <Navigator />
      <Route exact path='/' component={Homepage} />
      <Route path='/users/:id' component={UserProfilePage} />
    </>
  );
}

export default App;
