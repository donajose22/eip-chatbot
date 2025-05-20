let env = process.env.REACT_APP_ENV || 'development'; //CHANGE REACT_APP_ENV TO PRODUCTION WHEN USING PRODUCTION

let development_apigee_const = {
  token_endpoint: 'https://apis-dev.intel.com/v1/auth/token',
  id: 'fc4d18f6-8074-48dc-b97e-7f3807754764',
  secret: process.env.REACT_APP_APIGEE_SECRET,
  proxy: {
    protocol: 'http',
    host: 'proxy-dmz.intel.com',
    port: 912,
  },
};

let apigee_constants = development_apigee_const;
// if (env === 'production') {
//   apigee_constants = production_apigee_const;
// }
// if (env === 'test') {
//   apigee_constants = test_apigee_const;
// }

export default apigee_constants;
