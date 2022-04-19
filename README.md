# Setup

Install dependencies :
```sh
npm i
```
Copy the environment variables : 
```
cp .env.example .env
```

And then change variables inside `.env` to match your own environment.
If you ever want to add an environment variable, please add them to `src/environment.js` and `.env.example`.

# Useful commands

## Develop

This will start the server and reload it when one source file changes : 

```sh
npm run dev
```

## Run the app in production

```sh
npm start
```

## Run the tests

```sh
npm run test
```