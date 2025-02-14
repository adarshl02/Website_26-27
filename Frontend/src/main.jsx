import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { persistor, store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { HelmetProvider } from 'react-helmet-async';
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New update available! Refresh to apply changes?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App is ready to work offline!');
  },
});

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </PersistGate>
  </Provider>
);
