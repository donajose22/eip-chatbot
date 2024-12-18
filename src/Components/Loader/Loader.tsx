
import React, { useState, useEffect } from 'react';
import BotAvatar from '../BotAvatar';
import "./Loader.css"

const Loader = () => {
    const [milliseconds, setMilliseconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMilliseconds(prevMilliseconds => prevMilliseconds + 100);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const seconds = Math.floor(milliseconds / 1000);
  const displayMilliseconds = Math.floor((milliseconds % 1000) / 100);

    return (
        <div className='chatbot-loader-container'>
            <BotAvatar />
            <table>
                <tr>
                <div>
            <svg
                id='dots'
                width='50px'
                height='15px'
                viewBox='0 0 132 58'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
            >
                <g stroke='none' fill='none'>
                    <g id='chatbot-loader' fill='#157acc'>
                        <circle id='chatbot-loader-dot1' cx='25' cy='30' r='13'></circle>
                        <circle id='chatbot-loader-dot2' cx='65' cy='30' r='13'></circle>
                        <circle id='chatbot-loader-dot3' cx='105' cy='30' r='13'></circle>
                    </g>
                </g>
            </svg>
            </div>
                </tr>
                <tr>
                <div className='timer'>
            Generating: {seconds}.{displayMilliseconds} s
            </div>
                </tr>
            </table>
            
            
        </div>
    );
};

export default Loader;
