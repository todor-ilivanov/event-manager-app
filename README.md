# Event Manager App

Barebones event management app using a backend serverless API. Users are able to sign in, create and view events, where the events are grouped by Ongoing, Upcoming and Past.

## Deployment
Netlify CI/CD is set up for this project. Deployed at https://serene-goldwasser-22cd0e.netlify.app/.

## Workflow
Authentication is done via AWS Cognito, and API requests are routed to Lambdas using API Gateway. Storage of events is done using DynamoDB.

## Local Development
* `yarn install` - install dependencies 
* `yarn start` - run the app
* `yarn test` - run unit tests

## Weather
Weather images taken from [openweathermap](https://openweathermap.org/weather-conditions#Icon-list) - the public API that the backend uses for weather information.

## Future development
* Styling improvements
* E2E tests
* Display more information about events
* Integrate with an S3 bucket to allow users to upload images for their events
