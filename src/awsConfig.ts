const awsConfig = {
    s3: {
        REGION: 'eu-west-2',
        BUCKET: 'event-manager-images',
    },
    apiGateway: {
        REGION: 'eu-west-2',
        URL: 'https://c9dxehld23.execute-api.eu-west-2.amazonaws.com/prod',
    },
    cognito: {
        REGION: 'eu-west-2',
        USER_POOL_ID: 'eu-west-2_MWyXBacEw',
        APP_CLIENT_ID: '654bq6u4lmftfjqgdvd4lj1o9l',
        IDENTITY_POOL_ID: 'eu-west-2:dbb85108-5820-4ccd-a72a-6b531ec0d3bb',
    },
};

export default awsConfig;