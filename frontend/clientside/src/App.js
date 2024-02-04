import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes } from 'react-router-dom';

// import { checkAuth } from './store/features/user';

import { Navigation } from './hocs/Navigation';


const App = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(checkAuth());
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <React.Fragment>
      <Navigation />
    </React.Fragment>
  )
};

export default App;