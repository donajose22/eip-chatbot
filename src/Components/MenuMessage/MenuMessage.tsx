import React, { useState, useEffect, useRef } from 'react';
import service_constants from '../../const/services.consts';
import BotAvatar from "../BotAvatar";
import './MenuMessage.css';

interface Topic {
    text: string;
    handler: (topic: { text: string; handler: Function; id: number }) => void;
    id: number;
}

const MenuMessage = (props: any) => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const fetch_topics_api_endpoint = service_constants.fetch_topics_api_endpoint;
    const isFetchedRef = useRef(false);

    useEffect(() => {
        if (!isFetchedRef.current) {
            fetch(fetch_topics_api_endpoint)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const fetchedTopics: Topic[] = data.map((item: any) => ({
                        text: item[1],
                        handler: props.actionProvider.handleTopic,
                        id: item[0],
                    }));
                    setTopics(fetchedTopics);
                    isFetchedRef.current = true;
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
        }
    }, [props.actionProvider, fetch_topics_api_endpoint]);

    const options = [
        { text: "About DMS", handler: props.actionProvider.handleOption, id: 1 },
        { text: "General Information", handler: props.actionProvider.handleOption, id: 2 },
        { text: "IPs", handler: props.actionProvider.handleOption, id: 3 },
        { text: "Intel and Recipient Reps", handler: props.actionProvider.handleOption, id: 4 },
        { text: "Export Compliances", handler: props.actionProvider.handleOption, id: 5 },
        { text: "Approvals", handler: props.actionProvider.handleOption, id: 6 },
        { text: "File a support ticket", handler: props.actionProvider.handleOption, id: 7 },
        { text: "Miscellaneous", handler: props.actionProvider.handleOption, id: 8 },
    ];

    const buttonsMarkup = options.map((option) => (
        <button key={option.id} onClick={() => option.handler(option.text)} className="option-button">
            {option.text}
        </button>
    ));

    return (
        <div className="react-chatbot-kit-chat-bot-message-container">
            <BotAvatar />
            <div className="react-chatbot-kit-chat-bot-message">
                Hello and welcome! How can I assist you today? <br />
                I specialize in 3rd Party DMS process-related queries and can provide information from the External IP Wiki, RDSE Wiki, DMS Wiki and EDIT database. <br />
                Please select the topic that is most applicable from the options provided below.
                <div className='topics-container'>
                    {topics.length > 0 ? (
                        topics.map((topic) => (
                            <button key={topic.id} onClick={() => topic.handler(topic)} className="topic-tiles">
                                {topic.text}
                            </button>
                        ))
                    ) : (
                        <p>Loading topics...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MenuMessage;
