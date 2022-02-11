# <div align="center">myWebsocketApp</div>
### <div align="center">Command driven Symfony6 Websocket Chat Server with VueJS Client using JWT for authentification</div>
<p align="center">
  <img src="https://github.com/snoke/myWebsocketApp/blob/master/myWebsocketApp.png?raw=true" />
</p>

<br /><br />
## Description
Websockets are persistent connections over TCP. 
This is not only a lot faster then typical http requests where a new connection gets established for each request, also this allows live broadcasting to clients.

<br /><br />
## Features
* Browser Push Notifications
* Emojis
* Message Status (delivered/seen)
* Image Upload/File Transfer
* live is typing info
* block/unblock chat
* vuejs web and native android client
Project contains a super simple ```server:start```  - Command, a Json Api and a VueJS Client.
<br /><br />
<a name="Downloads"></a>
## Downloads
* [Native Android Chat Client (APK)](https://github.com/snoke/myWebsocketApp/raw/master/public/downloads/android-client-latest.apk)  
<br /><br />
## Live Demo
browse to https://websocketchat.stefan-sander.online or use the [Native Android Chat Client](#Downloads) 
using following credientials
```
alice:test
```
```
bob:test
```
<br /><br />
## Server Installation
run following command to checkout the project
```
git clone https://github.com/snoke/myWebsocketApp.git myWebsocketChat && cd myWebsocketChat && nano .env
```
edit .env and set server, websocket and database url and a jwt password 
```
SERVER_URL='http://localhost' 
WEBSOCKET_URL='ws://localhost:8080' //should match server:start command output as server and client can run on different machines
DATABASE_URL="mysql://root@127.0.0.1:3306/myDatabase?serverVersion=mariadb-10.4.11"
JWT_PASSPHRASE=supersecretpassword
```

then install dependencies, set up database, jwt keypairs and assets
```
composer up
php bin/console doctrine:database:create && php bin/console do:mi:mi
php bin/console lexik:jwt:generate-keypair && chown www-data config/jwt -R
npm install && npm run dev 
```
<br /><br />
## Start Websocket Server
```
php bin/console server:start
```
<br />

## Build Client Apk (Android Package Kit)
* native client can be built using capacitor (check https://capacitorjs.com/docs/getting-started/environment-setup to install SDKs and Emulators)

```
npm install @capacitor/cli --save-dev
npx cap init && php bin/console app:generate:entrypoint && npx cap add android && npx cap run android
```
<br /><br />
## TODOs
* setup firebase and implement native android notification
* build native ios client 
