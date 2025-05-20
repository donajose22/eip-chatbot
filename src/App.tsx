import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ChatbotButton from "./Components/ChatbotButton";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loginRequest } from './authConfig';
import {
  useMsal,
  useIsAuthenticated,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import { InteractionStatus, InteractionType } from '@azure/msal-browser';
import { ToastContainer, Slide } from 'react-toastify';
import Login from './features/login/Login';
import UserDetails from './Components/UserDetails';

export interface UserDetailsInterface {
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

let userDetails: UserDetailsInterface | null = null;

export const getUserDetails = () => {
  return userDetails;
};


function App() {
  const isAuthenticated = useIsAuthenticated();
  const { instance, inProgress } = useMsal();

  if (inProgress === InteractionStatus.None && !isAuthenticated) {
    instance.loginRedirect({
      scopes: loginRequest['scopes'],
    });
  }

  const [localUserDetails, setLocalUserDetails] = useState<UserDetailsInterface | null>(null);

  const handleUserDetailsFetched = (details: UserDetailsInterface) => {
    setLocalUserDetails(details);
    userDetails = details; // Update the exported userDetails
  };

  if (!userDetails) {
    return (
      <>
        <UserDetails onUserDetailsFetched={handleUserDetailsFetched} />
        <AuthenticatedTemplate>
          <Router>
            <Routes>
              <Route path="/" element={<ChatbotButton isMaximizedChatbot={false} />} />
              <Route path="/maximize-chatbot" element={<ChatbotButton isMaximizedChatbot={true} />} />
            </Routes>
          </Router>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Login />
        </UnauthenticatedTemplate>
        <ToastContainer transition={Slide} />
      </>
    );
  }
  else {
    return (
      <>
        <AuthenticatedTemplate>
          <Router>
            <Routes>
              <Route path="/" element={<ChatbotButton isMaximizedChatbot={false} />} />
              <Route path="/maximize-chatbot" element={<ChatbotButton isMaximizedChatbot={true} />} />
            </Routes>
          </Router>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Login />
        </UnauthenticatedTemplate>
        <ToastContainer transition={Slide} />
      </>
    );
  }

}

export default App;
