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
                {state.message.message['is_sql_query'] == "1" && isDisplayed == "none" && (
                    <>
                        <button type="button" className="query-collapsible" onClick={expandCollapseContent}>SQL Query <div className='plusminus'>+</div></button>
                        <div className='sql-query-content' style={{ display: 'none' }} >{state.message.message['sql_query']}</div>
                    </>
                )}

                {state.message.message['is_sql_query'] == "1" && isDisplayed == "block" && (
                    <>
                        <button type="button" className="query-collapsible" onClick={expandCollapseContent}>SQL Query <div className='plusminus'>-</div></button>
                        <div className='sql-query-content' style={{ display: 'block' }} >{state.message.message['sql_query']}</div>
                    </>
                )}

            </div>
        </div>
    )

};

export default CustomMessage;
