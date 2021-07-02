const awsConfig = {
    s3: {
        REGION: 'YOUR_S3_UPLOADS_BUCKET_REGION',
        BUCKET: 'YOUR_S3_UPLOADS_BUCKET_NAME',
    },
    apiGateway: {
        REGION: 'YOUR_API_GATEWAY_REGION',
        URL: 'YOUR_API_GATEWAY_URL',
    },
    cognito: {
        REGION: 'eu-west-2',
        USER_POOL_ID: 'eu-west-2_MWyXBacEw',
        APP_CLIENT_ID: '654bq6u4lmftfjqgdvd4lj1o9l',
        IDENTITY_POOL_ID: 'eu-west-2:dbb85108-5820-4ccd-a72a-6b531ec0d3bb',
    },
};

export default awsConfig;