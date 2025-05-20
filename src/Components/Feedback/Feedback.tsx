import React from 'react'
import { useState } from 'react';
import service_constants from '../../const/services.consts';
import { FaRegThumbsUp, FaRegThumbsDown, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "./Feedback.css"

const Feedback = (state: any) => {

    const [isThumbsUp, setIsThumbsUp] = useState("none");

    const setThumbsUp = async () => {
        setIsThumbsUp("up");

        let api_endpoint = service_constants.feedback_api_endpoint+"?chat_id="+state.message.message['id']+"&feedback=1";
        await fetch(api_endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            });
    };

    const setThumbsDown = async () => {
        setIsThumbsUp("down");

        let api_endpoint = service_constants.feedback_api_endpoint+"?chat_id="+state.message.message['id']+"&feedback=0";
        await fetch(api_endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            });
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
