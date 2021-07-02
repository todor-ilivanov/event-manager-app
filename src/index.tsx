import React from 'react';
import ReactDOM from 'react-dom';
import { Amplify } from 'aws-amplify';
import './index.css';
import App from './App';
import awsConfig from './awsConfig';

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: awsConfig.cognito.REGION,
        userPoolId: awsConfig.cognito.USER_POOL_ID,
        identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: awsConfig.cognito.APP_CLIENT_ID,
    },
    // Storage: {
    //   region: config.s3.REGION,
    //   bucket: config.s3.BUCKET,
    //   identityPoolId: config.cognito.IDENTITY_POOL_ID
    // },
    // API: {
    //   endpoints: [
    //     {
    //       name: "event-manager-app",
    //       endpoint: config.apiGateway.URL,
    //       region: config.apiGateway.REGION
    //     },
    //   ]
    // }
});

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
