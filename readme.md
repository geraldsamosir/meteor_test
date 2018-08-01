pada project ini saya mengunakan query builder knex js
untuk migrasi silahkan
<br/>
1.install global knex cli
<br/>
2.  masuk ke folder /config/db/
<br/>
3. knex migrate:latest
<br/>
terdapat juga untuk manual sql di folder /config/db/sql
<br/>
untuk mendapatkan jwt silahkan login dulu dengan
<br/>email admin@mail.com
<br/>password admin
<br/>dan dapat juga menambakan usernya
<br/><br/>
untuk dokumentasi terdapat di 
<br/>
http://localhost:3002/api-docs/#/

<br/>
untuk config terdapat di file .env

<br/>
token expired dalam 120 second 
dapat di costum di .env
apabila expired gunkan router token pada group router user dengan mengirimkan refresh token pada header yang akan mengembalikan refresh token dan token yang baru 