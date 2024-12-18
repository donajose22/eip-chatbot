import { ReactElement } from 'react';
import { createChatBotMessage, createCustomMessage } from "react-chatbot-kit";
import Header from "../Components/Header";
import BotAvatar from "../Components/BotAvatar";
import Feedback from "../Components/Feedback/Feedback";
import CustomMessage from "../Components/CustomMessage/CustomMessage";
import MenuMessage from "../Components/MenuMessage/MenuMessage";
import FormButtons from "../Components/FormButtons/FormButtons";
import Loader from "../Components/Loader/Loader";

import IConfig from "react-chatbot-kit/build/src/interfaces/IConfig";

const config: IConfig = {
    botName: "Ask DMS",
    initialMessages: [
        createCustomMessage("Test", "initial", {}),
        createCustomMessage("Test", "formButtons", {})
    ],
    state: {
        // messages: [createChatBotMessage(`Hi there, what can I help you with today?`, {
        //   widget: "options",
        // }),],
    },
    customComponents: {
        header: () => <Header />,
        botAvatar: () => <BotAvatar />,
    },
    widgets: [
        {
            widgetName: "feedback",
            widgetFunc: (props) => <Feedback {...props} message={props.state.messages.find((msg: any) => (msg.payload === props.payload))}/>,
            props: {},
            mapStateToProps: [],
        },
    ],
    customMessages: {
        initial: (props: any) => <MenuMessage {...props} />,
        formButtons: (props: any) => <FormButtons {...props} />,
        loader: (props: any) => <Loader {...props} />,
        message: (props: any) => {
            return <CustomMessage {...props} message={props.state.messages.find((msg: any) => (msg.payload === props.payload))} />
        },
    },
};

export default config;