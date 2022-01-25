import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';
import SignIn from './pages/sign-in.page';
import SignOut from './pages/sign-out.page';
import { persistor, store } from './store';
import * as serviceWorker from './serviceWorker';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          <Router>
            <Routes>
              <Route path="/admin" element={<Fragment />}>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-out" element={<SignOut />} />
                <Route path="/*" element={<App />} />
              </Route>
            </Routes>
          </Router>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
