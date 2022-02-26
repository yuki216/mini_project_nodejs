# Documentation Mini Project Node JS

## Description
This mini project for RestFul Api using Node JS and Javascript.

## Stucture folder
```console
-app
 --handler
 --storages
   --models
 --middleware
 --routes
-config
-migrations
-seeders
```
![mini project nodejs](https://github.com/yuki216/mini_project_nodejs/blob/main/arsitektur%20_%20erd.png?raw=true)

## Architecture Diagram
- Rest Api is handler and business logic
- There is 2 model (merchant, product) 
## ERD Diagram
There is 2 table:
- Merchants 
- Products

## How to run this project
```console
    npm install --save sequelize-cli

    npm install

    sequelize db:migrate 

    //command for run live reload
    npm run dev 

    //command for run normal
    npm run start 

    //running test jest
    npm run test
```
## Api Documentation
you can see all api documentation on file spec.md
