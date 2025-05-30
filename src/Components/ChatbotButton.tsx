import React, { useState, useEffect } from 'react';
import Chatbot from "react-chatbot-kit";
import config from '../Chatbot/config';
import MessageParser from "../Chatbot/MessageParser";
import ActionProvider from "../Chatbot/ActionProvider";
import FormButtons from './FormButtons/FormButtons';
import { FaRegWindowMinimize } from "react-icons/fa";
import { MdOutlineFullscreen } from "react-icons/md";
import eip from '../assets/AskEIPLogo.png'

import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import { Client } from '@microsoft/microsoft-graph-client';



import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

import '../App.css';

interface ChatbotButtonProps {
  isMaximizedChatbot: boolean;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ isMaximizedChatbot }) => {

  const [isOpen, setIsOpen] = useState(true);
  const [isDisplayed, setIsDisplayed] = useState("block");
  const [isMaximized, setIsMaximized] = useState(isMaximizedChatbot);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setIsDisplayed("none");
    }
    else {
      setIsDisplayed("block");
    }
  };

  const maximizeChatbot = () => {
    setIsMaximized(true);
  };

  const validator = (input: any) => {
    input = input.trimStart().trimEnd();
    if (input.length > 0) return true;
    return false
  }

  const { instance, accounts } = useMsal();
  const [userDetails, setUserDetails] = useState({});

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
        }).catch(error => {
          console.error(error);
        });
      }).catch(error => {
        console.error(error);
      });
    }
  }, [accounts, instance]);

  // console.log(userDetails);

  return (
    <>
      {!isMaximizedChatbot && (
        <>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <button className="chatbot-icon-button" onClick={toggleChatbot}>
            {isOpen && (
              <div className='chatbot-icon-open-button'><IoClose></IoClose></div>
            )}
            {!isOpen && (
              <img src={eip} className='chatbot-icon' />
            )}
          </button>

          <div className='chatbot-popup' style={{ display: isDisplayed }}>

            <div className='header-minimize-button'>
              <Link target={"_blank"} to="/maximize-chatbot" >
                <button className='fullscreen-button' onClick={maximizeChatbot}><MdOutlineFullscreen /></button>
              </Link>

              <button className='minimize-button' onClick={toggleChatbot}><FaRegWindowMinimize /></button>
            </div>
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
              validator={validator}
            />

          </div>

        </>

      )}

      {isMaximizedChatbot && (
        <div className='chatbot-max'>
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            validator={validator}
          />
        </div>
      )}

    </>
  );
};

export default ChatbotButton;
