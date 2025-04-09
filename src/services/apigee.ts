// import { Buffer } from 'buffer';
import apigee_constants from '../const/apigee.consts';
let cached_token: string | null = null;
let expiry_time: string | null = null;
export const apigeeTokenGeneration = async () => {
  // const cached_token = sessionStorage.getItem("apigee_access_token")
  // const expiry_time = sessionStorage.getItem("apigee_access_token_expiry_time")
  // if (expiry_time != null) {
  //   if (parseInt(Buffer.from(expiry_time, 'base64').toString()) > Math.floor(Date.now() / 1000)) {
  //     console.log('Cached Token');
  //     if (cached_token != null) {
  //       // console.log("Inside",Buffer.from(cached_token,"base64").toString())
  //       // console.log("Inside",parseInt(Buffer.from(expiry_time,"base64").toString()))
  //       return Buffer.from(cached_token, 'base64').toString();
  //     }
  //   }
  // }
  const options = {
    method: 'POST',
    body:
      'grant_type=client_credentials&client_id=' +
      apigee_constants.id +
      '&client_secret=' +
      apigee_constants.secret,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    proxy: apigee_constants.proxy
  };
  let results = await fetch(apigee_constants.token_endpoint, options);
  let characters = await results.json();
  // let encoded_expiry = Buffer.from(
  //   (Math.floor(Date.now() / 1000) + (characters?.expires_in - 600)).toString(),
  // ).toString('base64');
  // let encoded_token = Buffer.from(characters?.access_token).toString('base64');
  // sessionStorage.setItem("apigee_access_token_expiry_time",encoded_expiry)
  // sessionStorage.setItem("apigee_access_token",encoded_token)
  // console.log(characters?.access_token)
  // console.log((Math.floor(Date.now() / 1000) +(characters?.expires_in - 600)).toString())
  // cached_token = encoded_token;
  // expiry_time = encoded_expiry;
  return characters?.access_token;
};