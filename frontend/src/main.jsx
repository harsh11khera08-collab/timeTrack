import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { msalConfig }  from "./AuthConfig.js"
import {MsalProvider} from "@azure/msal-react"
import { PublicClientApplication } from '@azure/msal-browser'

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <MsalProvider instance={msalInstance}>
  <App/>
  </MsalProvider>
)
