import { ReactElement } from 'react';
import { createChatBotMessage, createCustomMessage } from "react-chatbot-kit";
import Header from "../Components/Header";
import BotAvatar from "../Components/BotAvatar";
import Feedback from "../Components/Feedback/Feedback";
import CustomMessage from "../Components/CustomMessage/CustomMessage";
import MenuMessage from "../Components/MenuMessage/MenuMessage";
import FormButtons from "../Components/FormButtons/FormButtons";
import Loader from "../Components/Loader/Loader";
// import { IMessage } from './IMessages';
// import IWidget from './IWidget';

interface IConfig {
    botName?: string;
    initialMessages: any;
    state?: any;
    customComponents?: ICustomComponents;
    customStyles?: ICustomStyles;
    customMessages?: ICustomMessage;
    widgets?: any;
}

export interface ICustomComponents {
    header?: (props?: any) => ReactElement;
    botAvatar?: (props?: any) => ReactElement;
    botChatMessage?: (props?: any) => ReactElement;
    userAvatar?: (props?: any) => ReactElement;
    userChatMessage?: (props?: any) => ReactElement;
}

export interface ICustomMessage {
    [index: string]: (props: any) => ReactElement;
}

export interface ICustomStyles {
    botMessageBox?: IBackgroundColor;
    chatButton?: IBackgroundColor;
}

interface IBackgroundColor {
    backgroundColor: string;
}

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
        // {
        //     widgetName: "feedback",
        //     widgetFunc: (props: any) => <Feedback {...props} />,
        // },
        {
            widgetName: "feedback",
            widgetFunc: (props: any) => <Feedback {...props} />,
            props: {}, // Add default props if needed
            mapStateToProps: (state: any) => ({}) // Add state mapping if needed
        }
    ],
    customMessages: {
        initial: (props: any) => <MenuMessage {...props} />,
        formButtons: (props: any) => <FormButtons {...props} />,
        loader: (props: any) => <Loader {...props} />,
        message: (props: any) => {
            return <CustomMessage {...props} message={props.state.messages.find((msg: any) => (msg.payload === props.payload))} />
        },
        // feedback: (props: any) => {
        //   return <Feedback/>
        // }
    },
};

export default config;