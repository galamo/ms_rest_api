# Microservices

1. `Run docker compose up`
2. Run the api
3. Run the countries api
4. connect between the data from the countreis api and the vacations
5. response with the country flag!

## Running the Application

PREQ: run `npm i` from all folders (api, countriesApi, dev-apps, emailSender)

1. `Run docker compose up`
2. navigate to dev-apps
3. run `npm run all`
4. open browser and browse to: `http://localhost:4100/vacations`

## EX - Expose Hacker flow

1. Create new entry point - POST /login { user: "string", password:"string" }
2. Create new consumer called securityConsumer
3. Try to validate if the user has wrong in his password for at least 3 times - send a security message over RMQ to the securityConsumer
4. the consumer will write the name of the user name and the timestamp when someone tried to break his account into a file.
