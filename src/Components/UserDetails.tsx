import React, { useState, useEffect } from 'react'
import { useMsal } from '@azure/msal-react';
import { Client } from '@microsoft/microsoft-graph-client';
import { loginRequest } from '../authConfig';

export interface UserDetails {
    businessPhones: string[];
    displayName: string;
    givenName: string;
    jobTitle: string;
    mail: string;
    mobilePhone: string;
    officeLocation: string;
    preferredLanguage: string;
    surname: string;
    userPrincipalName: string;
    id: string;
}

type UserDetailsProps = {
    onUserDetailsFetched: (details: UserDetails) => void;
};

const UserDetails: React.FC<UserDetailsProps> = ({ onUserDetailsFetched }) => {

    const { instance, accounts } = useMsal();
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    useEffect(() => {
        if (accounts.length > 0) {
            const account = accounts[0];
            instance.acquireTokenSilent({
                ...loginRequest,
                account: account,
            }).then(response => {
                const graphClient = Client.init({
                    authProvider: (done) => {
                        done(null, response.accessToken);
                    },
                });

                graphClient.api('/me').get().then(user => {
                    setUserDetails(user);
                    onUserDetailsFetched(user);

                }).catch(error => {
                    console.error(error);
                });
            }).catch(error => {
                console.error(error);
            });
        }
    }, [accounts, instance, onUserDetailsFetched]);


    return (

        <div>

        </div>

    )
}

export default UserDetails
