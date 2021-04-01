# Roy Segall Loox Task

Hi, this is my solution for the task of the un-usual pets.

## Set up
As always:
```bash
npm i
cp .env.example .env 
```

By default, the pets will be pulled from the files which located under `src/data`. But, if you want to use a DB as the 
data source open the `.env` file and change the `driver` to `db`. Then, change the `mongoDBURL` and `mongoDBName` to 
meet you local env setup. Then, you'll need to seed the DB:
```bash
npm run db:seed
```

## Running the server
All you need to do is:
```bash
npm dev
```

## todo
There are alot of stuff I wanted to do:
* Unit test with Jest
* Testing the express server
* Running E2E test with cypress
* Add visual regression
* Dockerising the small app
