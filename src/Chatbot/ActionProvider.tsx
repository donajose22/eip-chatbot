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
    this.handleQuery(question);
  }


  handleTopic = async (topic: { text: string; handler: Function; id: number }) => {
    const message = this.createClientMessage(topic.text);
    this.addMessageToState(message);
    const loader = this.createCustomMessage("Test", "loader");
    this.addMessageToState(loader);

    let api_endpoint = service_constants.load_prompts_api_endpoint;
    let results = await fetch(api_endpoint + topic.id);
    console.log(results);
    const message2 = this.createChatBotMessage("Topic selected. Please type in your question.");
    this.replacePrevMessage(message2);

    const div = document.querySelector('.react-chatbot-kit-chat-input-container') as HTMLDivElement | null;
    if(div) {
      div.style.display = 'flex';
    }
  }


  handleQuery = async (message: string) => {
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