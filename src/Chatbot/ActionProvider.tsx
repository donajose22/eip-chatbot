// ActionProvider starter code
import service_constants from "../const/services.consts";
import Feedback from "../Components/Feedback/Feedback";
import { getUserDetails } from "../App";


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


  handleError = (errorMessage: string) => {
    // const errorMessage = "Something went wrong while processing your request. Please select the topic again.";
    const message2 = this.createChatBotMessage(errorMessage);
    this.replacePrevMessage(message2);
    this.mainMenuHandler();
  }


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

    let user_details = getUserDetails();

    let api_endpoint = service_constants.load_prompts_api_endpoint + topic.id;
    const data = { 'user': user_details };

    console.log("before ");
    let results = await fetch(api_endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    console.log("after ");
    console.log(results.status);

    const response = await results.json();

    if (results.status == 400) {
      this.handleError(response['message']);
      const div = document.querySelector('.react-chatbot-kit-chat-input-container') as HTMLDivElement | null;
      if (div) {
        div.style.display = 'none';
      }
    }
    else if (results.status == 200) {
      const message2 = this.createChatBotMessage("Topic selected. Please type in your question.");
      this.replacePrevMessage(message2);

      const div = document.querySelector('.react-chatbot-kit-chat-input-container') as HTMLDivElement | null;
      if (div) {
        div.style.display = 'flex';
      }
    }

  }


  handleQuery = async (message: string) => {
    // console.log("INSIDE HANDLE QUERY");
    const loader = this.createCustomMessage("Test", "loader");
    this.addMessageToState(loader);

    // get user details from cache
    let user_details = getUserDetails();

    // user details not present in cache
    if(user_details == null){
      this.handleError("Something went wrong while processing your request. Please select the topic again.");
      return;
    }
    const user_wwid = user_details['jobTitle'];

    let api_endpoint = service_constants.api_endpoint+"?wwid="+user_wwid+"&question="+message;
    let results = await fetch(api_endpoint);
    const response = await results.json();

    if(results.status == 404) {
      // status 404 - cache has expired
      this.handleError(response['message']);
      return;
    }
    
    const message2 = this.createCustomMessage(response, 'message', { payload: response });
    if(results.status == 200) { // only add feedback button if the response is successful
      message2.widget = 'feedback';
    }

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