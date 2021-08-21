import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'react-day-picker/lib/style.css';

import theme from '../theme';
import GlobalStyle from '../styled/GlobalStyle';
import '../styles/bootstrap.min.css';
import { store, persistor } from '../redux/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
  
  useEffect(() => {
    axios.get('https://ip2c.org/self')
      .then(res => {
        if (res.data) {
          const data = String(res.data).toLowerCase().split(';');
          if (data.length) {
            console.log(data[1]);
          }
        }
      })
      .catch(() => {
        console.log("Location does not detected");
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyle />
          <Component {...pageProps} />
          <ToastContainer />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default MyApp
