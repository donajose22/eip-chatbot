import React, { useState } from 'react';
import { FaRegWindowMinimize } from "react-icons/fa";
import ChatbotButton from './ChatbotButton';

const MinimizeButton = () => {

    const [isMinimized, setIsMinimized] = useState(false);

    const toggleChatbot = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <>
            {!isMinimized && (
                <button className="chatbot-icon-button" onClick={toggleChatbot}>

                    <div className='header-minimize-button'>
                        <FaRegWindowMinimize></FaRegWindowMinimize>
                    </div>

                </button>
            )}

            {isMinimized && (
                // <ChatbotButton isToggled={isMinimized} />
                <ChatbotButton isMaximizedChatbot={false} />
            )}
        </>
    )
}

export default MinimizeButton
