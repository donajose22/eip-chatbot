let env = process.env.REACT_APP_ENV || 'development'; //CHANGE REACT_APP_ENV TO PRODUCTION WHEN USING PRODUCTION

let development_service_const = {
    // api_endpoint: 'https://eip-chatbot-service.apps1-fm-int.icloud.intel.com/generate/',
    api_endpoint: "http://127.0.0.1:5000/generate/",
    // feedback_api_endpoint: 'https://eip-chatbot-service.apps1-fm-int.icloud.intel.com/feedback/',
    feedback_api_endpoint: 'http://127.0.0.1:5000/feedback/',
    // load_prompts_api_endpoint: 'https://eip-chatbot-service.apps1-fm-int.icloud.intel.com/load/',
    load_prompts_api_endpoint: 'http://127.0.0.1:5000/load/',
    // fetch_topics_api_endpoint: 'https://eip-chatbot-service.apps1-fm-int.icloud.intel.com/topics',
    fetch_topics_api_endpoint: 'http://127.0.0.1:5000/topics'
  };
  
let service_constants = development_service_const;
// if (env === 'production') {
//   apigee_constants = production_service_const;
// }
// if (env === 'test') {
//   apigee_constants = test_service_const;
// }

export default service_constants;