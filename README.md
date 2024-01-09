;
# REST APIs Using Typescript
This app is based on Typescript, Express, Zod and Prisma. It uses sqlite as database. It has all the CRUD operations for post schema.

## Running the app
Migrate database schema using below commands;
```shell script
npx prisma generate
```

```shell script
npx prisma migrate dev
```
Now, postgres has been added which can be launched using docker compose;

```shell script
docker-compose up -d
```

Launch Primsa Studio for Sqlite to see data and tables in the database

```shell script
npx prisma studio
```

Install all dependencies using below command;
```shell script
npm install
```

And finally run the app with below command;

```shell script
npm start
```


