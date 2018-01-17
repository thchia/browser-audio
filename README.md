[![Build Status](https://travis-ci.org/thchia/browser-audio.svg?branch=master)](https://travis-ci.org/thchia/browser-audio)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Introduction

This is a simple application with 2 routes:

1. Allow user to fetch a number of posts, and sort the results (`'/'`);
2. Allow user to play 2 audio samples in the browser (`'/tracks'`)

## Running locally

Clone the repository and navigate into the project root. Run

```
npm install

npm start
```

to start the app on `localhost:3000`

> npm v5 is recommended to read `package-lock.json`

# Development

## Testing Philosophy

Testing uses the [jest](https://facebook.github.io/jest/) test framework. To run tests:

`npm test`

Unit tests are included for the following:

* React components (using airbnb's [enzyme](https://github.com/airbnb/enzyme) library)
* Redux action creators
* Redux reducers

Data flow through the app is tested at `src/sagas/index.test.js`. It may be thought of as an integration test suite as it tests data flow from dispatching actions, ensuring that external functions are called and finally that the Redux store has the correct resulting data.

Tests are run remotely using [Travis CI](https://travis-ci.org/).
