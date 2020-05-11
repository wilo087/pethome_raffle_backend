# PetHomeRD Raffle Server

### Requirements 
* node version 13.12.0 or higher
``` sh
 node -v
```
* yarn version 1.22.4  or higher

``` sh 
 yarn -v
```

### how to deploy app ?

* configure mysql and run script.sql
into de database .

 ``` sh 
cp .env.example .env
```
```sh
cp prisma/.env.example prisma/.env
```
```sh
yarn install
```
```sh
yarn prisma introspect
```

```sh
yarn prisma generate
```
```sh
yarn run prod
```


### Routes
the graphql playground should be running @ http://localhost:4000/playground