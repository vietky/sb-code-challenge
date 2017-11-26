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

### INIT FRONTEND

Navigate to folder **/frontend/** and run the following commands


### TEST

- `curl 'http://127.0.0.1:8080/'`