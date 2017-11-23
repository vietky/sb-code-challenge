# sb-code-challenge

### INIT DB

Navigate to folder **db/**:

`docker build -t shop_back_db .`

`docker run -d shop_back_db`

### INIT API

`docker build -t shop_back_api .`
`docker run -p 8080:3000 -d shop_back_api`

### TEST

`curl 'http://127.0.0.1:8080/'`