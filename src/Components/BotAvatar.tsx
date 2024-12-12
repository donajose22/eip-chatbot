import React from 'react'
import eip from '../assets/AskEIPLogo.png'

const BotAvatar = () => {
    return (
        <div className='react-chatbot-kit-chat-bot-avatar-container'>
            {/* <img src="src/assets/AskEIPLogo.png" className='react-chatbot-kit-chat-bot-avatar-icon' /> */}
            <img src={eip} className='react-chatbot-kit-chat-bot-avatar-icon' />
        </div>
    )
}

export default BotAvatar