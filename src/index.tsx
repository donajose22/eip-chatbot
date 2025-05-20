import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig, prodMsalConfig, loginRequest } from './authConfig';
import { EventType, EventMessage, AuthenticationResult, PublicClientApplication } from '@azure/msal-browser';
import { Client } from '@microsoft/microsoft-graph-client';

let msalInstance = new PublicClientApplication(msalConfig);
if (process.env.REACT_APP_ENV) {
  if (process.env.REACT_APP_ENV.toLowerCase() === 'production') {
    msalInstance = new PublicClientApplication(prodMsalConfig);
  }
}

const container = document.getElementById('root')!;
const root = createRoot(container);

export const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}


export const getUserDetails = async (): Promise<any> => {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    const account = accounts[0];
    try {
      await msalInstance.initialize();
      const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account,
      });
      const graphClient = Client.init({
        authProvider: (done) => {
          done(null, response.accessToken);
        },
      });

      const user = await graphClient.api('/me').get();
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    throw new Error('No accounts found');
  }
};


msalInstance.enableAccountStorageEvents();
msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;
    msalInstance.setActiveAccount(account);
  }
});

export const queryClient = new QueryClient();

root.render(
    <Provider store={store}>
      <MsalProvider instance={msalInstance}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </MsalProvider>
    </Provider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
