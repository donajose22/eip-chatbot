import React from 'react'
import { useState } from 'react';
import service_constants from '../../const/services.consts';
import { FaRegThumbsUp, FaRegThumbsDown, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "./Feedback.css"

const Feedback = (state: any) => {

    const [isThumbsUp, setIsThumbsUp] = useState("none");

    const setThumbsUp = async () => {
        setIsThumbsUp("up");

        const data = {
            "chat_id": state.message.message['id'],
            "feedback": "1"
        }

        let api_endpoint = service_constants.feedback_api_endpoint;
        api_endpoint = "http://127.0.0.1:5000/feedback"
        await fetch(api_endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
            });
        console.log("FEEDBACK SENT SUCCESSFULLY");
    };

    const setThumbsDown = async () => {
        setIsThumbsUp("down");

        const data = {
            "chat_id": state.message.message['id'],
            "feedback": "0"
        }

        let api_endpoint = service_constants.feedback_api_endpoint;
        // api_endpoint = "http://127.0.0.1:5000/feedback";
        await fetch(api_endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
            });
        console.log("FEEDBACK SENT SUCCESSFULLY");
    };

    return (
        <div className='feedback-buttons'>
            <span className='feedback-text'>Was this helpful?</span>

            {isThumbsUp === "none" && (
                <>
                    <button className='thumbs-up' onClick={setThumbsUp}><FaRegThumbsUp /></button>
                    <button className='thumbs-down' onClick={setThumbsDown}><FaRegThumbsDown /></button>
                </>
            )}

            {isThumbsUp === "up" && (
                <>
                    <button className='thumbs-up' ><FaThumbsUp /></button>
                    <button className='thumbs-down' onClick={setThumbsDown}><FaRegThumbsDown /></button>
                </>
            )}

            {isThumbsUp === "down" && (
                <>
                    <button className='thumbs-up' onClick={setThumbsUp}><FaRegThumbsUp /></button>
                    <button className='thumbs-down'><FaThumbsDown /></button>
                </>
            )}

        </div>
    )
}

export default Feedback
