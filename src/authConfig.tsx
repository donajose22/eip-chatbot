import { LogLevel } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    clientId: '79f5373a-d47c-455f-b728-d2b23345cb3e',
    authority: 'https://login.microsoftonline.com/46c98d88-e344-4ed4-8496-4ed7712e255d',
    // redirectUri: 'https://eip-chatbot.apps1-fm-int.icloud.intel.com/',
    postLogoutRedirectUri: '/',
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    windowHashTimeout: 9000, // Applies just to popup calls - In milliseconds
    iframeHashTimeout: 9000, // Applies just to silent calls - In milliseconds
    loadFrameTimeout: 9000, // Applies to both silent and popup calls - In milliseconds
}
};

export const loginRequest = {
  scopes: ['User.Read'],
};


export const prodMsalConfig = {
  auth: {
    clientId: '0e30d0c7-349c-4d58-a0be-2f3f73bdd665',
    authority: 'https://login.microsoftonline.com/46c98d88-e344-4ed4-8496-4ed7712e255d',
    // redirectUri: 'https://eipchatbot.app.intel.com/',
    postLogoutRedirectUri: '/',
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  }
};