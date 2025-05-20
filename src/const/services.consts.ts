let env = process.env.REACT_APP_ENV || 'development'; //CHANGE REACT_APP_ENV TO PRODUCTION WHEN USING PRODUCTION

let local_service_const = {
  api_endpoint: "http://127.0.0.1:5000/generate",
  feedback_api_endpoint: 'http://127.0.0.1:5000/feedback',
  load_prompts_api_endpoint: 'http://127.0.0.1:5000/load/',
  fetch_topics_api_endpoint: 'http://127.0.0.1:5000/topics'
};

let development_service_const = {
    api_endpoint: 'https://eip-chatbot-service.apps1-fm-int.icloud.intel.com/generate',
    feedback_api_endpoint: 'https://eip-chatbot-service.apps1-fm-int.icloud.intel.com/feedback',
    load_prompts_api_endpoint: 'https://eip-chatbot-service.apps1-fm-int.icloud.intel.com/load/',
    fetch_topics_api_endpoint: 'https://eip-chatbot-service.apps1-fm-int.icloud.intel.com/topics',
  };

  let production_service_const = {
    api_endpoint: 'https://eip-chatbot-service.apps1-or-int.icloud.intel.com/generate',
    feedback_api_endpoint: 'https://eip-chatbot-service.apps1-or-int.icloud.intel.com/feedback',
    load_prompts_api_endpoint: 'https://eip-chatbot-service.apps1-or-int.icloud.intel.com/load/',
    fetch_topics_api_endpoint: 'https://eip-chatbot-service.apps1-or-int.icloud.intel.com/topics',
  };
  
let service_constants = development_service_const;
if (env === 'production') {
  service_constants = production_service_const;
}
else if(env == 'development') {
  service_constants = development_service_const;
}
else {
  service_constants = local_service_const;
}

export default service_constants;