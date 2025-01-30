import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import {legacy_createStore} from 'redux'
import {Provider} from 'react-redux'
import appReducer from './Redux/AppReducer.jsx'

const appStore = legacy_createStore(appReducer)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
    <BrowserRouter>
    <MantineProvider defaultColorScheme="dark" withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
