# sb-code-challenge

Follow these steps one by one to run the project:

### INIT DB

Navigate to folder **/db/** and run the following commands

- `docker network create --subnet=172.18.0.0/16 shop_back_network`
- `docker build -t shop_back_db .`
- `docker run --ip 172.18.0.17 --name shop_back_db -p 5432:5432 -d --network shop_back_network shop_back_db`

### INIT API

Navigate to folder **/backend/** and run the following commands

- `docker build -t shop_back_api .`
- `docker run -e NODE_ENV=production -e DB_HOST=172.18.0.17 --name shop_back_api -p 8080:3000 -d --network shop_back_network shop_back_api`

### API DOC

All apis needed: https://www.getpostman.com/collections/b2c8123d857c107da1a6

Postman environment:
- host: `http://localhost:8080`

### INIT FRONTEND

Navigate to folder **/frontend/** and run the following commands

- `npm install`
- `npm start`

### TEST

- Open `http://localhost:3000/`


### UNDONE ITEMS

- UI to manage events => Please consult postman link above to create/update events
- CSS :)
- Dockerize & deploy frontend stuffs
