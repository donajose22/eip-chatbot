let env = process.env.REACT_APP_ENV || 'development'; //CHANGE REACT_APP_ENV TO PRODUCTION WHEN USING PRODUCTION

let development_service_const = {
    api_endpoint: 'https://eip-chatbot-service.apps1-fm-int.icloud.intel.com/generate/',
    feedback_api_endpoint: 'https://eip-chatbot-service.apps1-fm-int.icloud.intel.com/feedback/',
  };
  
let service_constants = development_service_const;
// if (env === 'production') {
//   apigee_constants = production_service_const;
// }
// if (env === 'test') {
//   apigee_constants = test_service_const;
// }

export default service_constants;