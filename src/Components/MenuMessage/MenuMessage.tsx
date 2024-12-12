import React from 'react'
import BotAvatar from "../BotAvatar";
import './MenuMessage.css'

const MenuMessage = (props: any) => {
    const options = [
        {
            text: "About DMS",
            handler: props.actionProvider.handleOption,
            id: 1,
        },
        { text: "General Information", handler: props.actionProvider.handleOption, id: 2 },
        { text: "IPs", handler: props.actionProvider.handleOption, id: 3 },
        { text: "Intel and Recipient Reps", handler: props.actionProvider.handleOption, id: 4 },
        { text: "Export Compliances", handler: props.actionProvider.handleOption, id: 5 },
        { text: "Approvals", handler: props.actionProvider.handleOption, id: 6 },
        { text: "File a support ticket", handler: props.actionProvider.handleOption, id: 7 },
        { text: "Miscellaneous", handler: props.actionProvider.handleOption, id: 8 },
    ];

    const buttonsMarkup = options.map((option) => (
        <button key={option.id} onClick={() => option.handler(option.text)}   className="option-button">
        {option.text}
        </button>  
    ));

    return <div className="react-chatbot-kit-chat-bot-message-container">

        <BotAvatar />
        <div className="react-chatbot-kit-chat-bot-message">
        Hello and welcome! How can I assist you today? <br/>
        I specialize in 3rd Party DMS process-related queries and can provide information from the External IP Wiki, RDSE Wiki, DMS Wiki and EDIT database. <br />
        Please select an option below or type in your question to get started.
        <div className="options-container">{buttonsMarkup}
        </div>
        </div>
    </div>;
}

export default MenuMessage
