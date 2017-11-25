# sb-code-challenge

### HOW TO RUN

1. Navigate to folder **db/** & follow the README.md to init db
2. Navigate to folder **backend/** & follow the README.md to start api
3. Navigate to folder **frontend/** & follow the README.md to run the web


### INIT DB

- `docker network create --subnet=172.18.0.0/16 shop_back_network`
- `docker build -t shop_back_db .`
- `docker run --ip 172.18.0.17 --name shop_back_db -p 5432:5432 -d --network shop_back_network shop_back_db`

### INIT API

- `docker build -t shop_back_api .`
- `docker run -e NODE_ENV=production --name shop_back_api -p 8080:3000 -d --network shop_back_network shop_back_api`

### TEST

- `curl 'http://127.0.0.1:8080/'`