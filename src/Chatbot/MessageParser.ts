// MessageParser starter code
class MessageParser {
    actionProvider: any;
    state: any;

    constructor(actionProvider: any, state: any) {
        this.actionProvider = actionProvider;
        this.state = state;
    }

    parse(message: string) {
        // console.log(message);
        // console.log(this.state);
        if (message === "clear") {
            this.actionProvider.clearChatHandler();
        }
        else if (message === "menu") {
            this.actionProvider.mainMenuHandler(message);
        }
        else {
            this.actionProvider.handleQuery(message);
        }
    }
}

export default MessageParser;