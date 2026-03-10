export const msalConfig =  {
      auth : {
        clientId : "3a780fe7-1950-45d4-9b97-f488c01a55f9",
        authority : "https://login.microsoftonline.com/f3753df1-d56f-4b0d-9fc0-527f64948897",
        redirectUri : "http://localhost:3000",
      }
};

export const loginReq = {
    scopes : ["openid","profile","email","User.Read"]
};