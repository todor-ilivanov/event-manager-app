# Event Manager

Barebones event management app using a serverless API. Users can sign in, create and view events grouped by Ongoing, Upcoming and Past.

## Structure

This is a yarn workspaces monorepo:

```
packages/
  app/   — React/TypeScript UI (CRA + Material UI + AWS Amplify)
  api/   — Serverless API (AWS Lambda + DynamoDB)
```

## Workflow

Authentication is done via AWS Cognito, and API requests are routed to Lambdas using API Gateway. Events are stored in DynamoDB.

## Local Development

```bash
yarn install        # install all workspace dependencies
yarn start          # run the UI (packages/app)
yarn build          # build the UI
yarn test           # run tests in all packages
yarn deploy         # deploy the API (packages/api)
```

Or target a specific package:

```bash
yarn workspace app start
yarn workspace event-manager-api test
```

## Weather

Weather images from [openweathermap](https://openweathermap.org/weather-conditions#Icon-list) — the public API used by the backend for weather information.

## Future Development

* Styling improvements
* E2E tests
* Display more information about events
* Integrate with S3 to allow users to upload images for their events
