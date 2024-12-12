let env = process.env.REACT_APP_ENV || 'development'; //CHANGE REACT_APP_ENV TO PRODUCTION WHEN USING PRODUCTION

let development_apigee_const = {
  token_endpoint: 'https://apis-dev.intel.com/v1/auth/token',
  id: 'd36a38f9-f7ff-4052-9660-9d1dd493c297',
  secret: process.env.REACT_APP_APIGEE_DEV_SECRET,
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
