import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig, prodMsalConfig, loginRequest } from '../authConfig';
import { EventType, EventMessage, AuthenticationResult, PublicClientApplication } from '@azure/msal-browser';
import { Client } from '@microsoft/microsoft-graph-client';


export const getUser = async (): Promise<any> => {
    let msalInstance = new PublicClientApplication(msalConfig);
    if (process.env.REACT_APP_ENV) {
        if (process.env.REACT_APP_ENV.toLowerCase() === 'production') {
            msalInstance = new PublicClientApplication(prodMsalConfig);
        }
    } 

    
    await msalInstance.initialize();

    console.log(msalInstance);   
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
    }

    // const { instance, accounts } = useMsal();
    // const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    if (accounts.length > 0) {
        const account = accounts[0];
        try {
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
