import React from 'react';
import ReactDOM from 'react-dom';
import { Amplify } from 'aws-amplify';
import './styles/index.css';
import App from './components/App';
import awsConfig from './awsConfig';

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: awsConfig.cognito.REGION,
        userPoolId: awsConfig.cognito.USER_POOL_ID,
        identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: awsConfig.cognito.APP_CLIENT_ID
    },
    Storage: {
        region: awsConfig.s3.REGION,
        bucket: awsConfig.s3.BUCKET,
        identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID
    },
    API: {
        endpoints: [
            {
                name: 'events',
                endpoint: awsConfig.apiGateway.URL,
                region: awsConfig.apiGateway.REGION
            },
        ]
    }
});

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
