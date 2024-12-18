// ActionProvider starter code
import service_constants from "../const/services.consts";
import Feedback from "../Components/Feedback/Feedback";

class ActionProvider {
  createChatBotMessage: any;
  setState: any;
  createClientMessage: any;
  stateRef: any;
  createCustomMessage: any;

  constructor(
    createChatBotMessage: any,
    setStateFunc: any,
    createClientMessage: any,
    stateRef: any,
    createCustomMessage: any,
    ...rest: any[]
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  mainMenuHandler = () => {
    const message = this.createCustomMessage("Test", "initial");
    this.addMessageToState(message);
  };

  clearChatHandler = () => {
    const message = this.createCustomMessage("Test", "formButtons");
    this.setState((state: any) => ({ ...state, messages: [message] }));
    // let token = apigeeTokenGeneration();
    // console.log(token);
  };

  handleOption = (question: string) => {
    const message = this.createClientMessage(question);
    this.addMessageToState(message);
    // const query = "Give details ";
    // const message2 = this.createChatBotMessage("DMS - Disclosure Management System");
    // message2.widget = ['feedback'];
    // this.addMessageToState(message2);
    this.handleQuery(question);
  }

  handleAboutDMS = () => {
    const message = this.createClientMessage("About DMS");
    this.addMessageToState(message);
    const message2 = this.createChatBotMessage("DMS - Disclosure Management System");
    message2.widget = ['feedback'];
    this.addMessageToState(message2);
  }

  handleGeneralInformation = () => {
    const message = this.createClientMessage("General Information");
    this.addMessageToState(message);
    const message2 = this.createChatBotMessage(
      "General Information about DMS - Disclosure Management System. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita debitis repellendus cum odio vitae dicta incidunt iure adipisci, in officiis ea assumenda corrupti quis commodi illo minima tempore autem at!");
      message2.widget = ['feedback'];
    
    this.addMessageToState(message2);
  }

  handleQuery = async (message: string) => {
    // console.log(message);
    const loader = this.createCustomMessage("Test", "loader");
    this.addMessageToState(loader);

    let api_endpoint = service_constants.api_endpoint;
    let results = await fetch(api_endpoint + message);
    const response = await results.json();
    // console.log(response);
    const message2 = this.createCustomMessage(response, 'message', { payload: response });
    message2.widget = 'feedback';

    this.replacePrevMessage(message2);
  }

  addMessageToState = (message: string) => {
    this.setState((prevState: any) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  replacePrevMessage = (message: string) => {
    const formb = this.createCustomMessage("Test", "formButtons");
    this.setState((prevState: any) => ({
      ...prevState,
      messages: [...prevState.messages.slice(0, -1), formb, message],
    }));
  };

}

export default ActionProvider;