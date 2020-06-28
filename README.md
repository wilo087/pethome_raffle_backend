# PetHomeRD Raffle Server

### Requirements 
* Node version ^13.12.0
* Yarn version ^1.22.4

### Setup?
Config the database access

 ``` sh 
cp .env.example .env
```

Run the app
```sh
# Production
yarn start

# Development
yarn start:dev
```
> The app should be running on [localhost:3000](http://localhost:3000)

### Routes
Get Winner: GET http://localhost:3000/v1/winner
