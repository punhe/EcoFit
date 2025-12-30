/* eslint-disable react/forbid-prop-types */
import { Preloader } from '@/components/common';
import { NextUIProvider } from '@nextui-org/react';
import PropType from 'prop-types';
import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppRouter from '@/routers/AppRouter';

const App = ({ store, persistor }) => (
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Preloader />} persistor={persistor}>
        <NextUIProvider>
          <AppRouter />
        </NextUIProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);

App.propTypes = {
  store: PropType.any.isRequired,
  persistor: PropType.any.isRequired
};

export default App;
