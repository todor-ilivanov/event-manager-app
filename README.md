# Event Manager App

Barebones event management app using a backend serverless API. Users are able to sign in, create and view events, where the events are grouped by Ongoing, Upcoming and Past.

## Deployment
Netlify CI/CD is set up for this project. Deployed at https://serene-goldwasser-22cd0e.netlify.app/.

## Workflow
Authentication is done via AWS Cognito, and API requests are routed to Lambdas using API Gateway. Storage of events is done using DynamoDB.

## Local Development
* Install dependencies - `yarn install`
* Run the app - `yarn start`
* Run unit tests - `yarn test`

## Future development
* Styling improvements
* E2E tests
* Display more information about events (e.g. weather)
* Integrate with an S3 bucket to allow users to upload images for their events
