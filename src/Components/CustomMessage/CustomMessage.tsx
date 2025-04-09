import React, { useState } from 'react';
import BotAvatar from '../BotAvatar';
import "./CustomMessage.css"

const CustomMessage = (state: any, message: any) => {

    const [isDisplayed, setIsDisplayed] = useState("none");

    const expandCollapseContent = () => {
        if (isDisplayed === "block") {
            setIsDisplayed("none");
        }
        else {
            setIsDisplayed("block");
        }
    };
    return (
        <div className="react-chatbot-kit-chat-bot-message-container">
            <BotAvatar />
            <div className="react-chatbot-kit-chat-bot-message">
                <div dangerouslySetInnerHTML={{ __html: state.message.message['response'] }}></div>
                {state.message.message['is_query'] == "1" && isDisplayed == "none" && (
                    <>
                        <button type="button" className="query-collapsible" onClick={expandCollapseContent}>SQL Query <div className='plusminus'>+</div></button>
                        <div className='sql-query-content' style={{ display: 'none' }} >{state.message.message['query']}</div>
                    </>
                )}

                {state.message.message['is_query'] == "1" && isDisplayed == "block" && (
                    <>
                        <button type="button" className="query-collapsible" onClick={expandCollapseContent}>SQL Query <div className='plusminus'>-</div></button>
                        <div className='sql-query-content' style={{ display: 'block' }} >{state.message.message['query']}</div>
                    </>
                )}
                {state.message.message['time_taken'] && (
                    <div className='timenote'>
                        <br/>
                        Time taken to generate response: {state.message.message['time_taken']} s
                        <br />
                        We are continuously working on improving our response time to enhance your experience. Thank you for your patience and understanding.
                    </div> 
                )}
                
            </div>
        </div>
    )

};

export default CustomMessage;
