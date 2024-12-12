import React from 'react'
import "./FormButtons.css"

const FormButtons = (props: any) => {
    return (
        <div className='react-chatbot-kit-chat-input-buttons'>
            <button className='main-menu-button' onClick={props.actionProvider.mainMenuHandler}> Main Menu </button>
            <button className='clear-chat-button' onClick={props.actionProvider.clearChatHandler}>Clear Chat</button>
        </div>
    )
}

export default FormButtons
