
<div name="menu">

---

<div align="center">
  
  [About](#about) -
  [Description](#Description) -
   [Features](#Features) -
   [Live Demo](#LiveDemo) -
   [Downloads](#Downloads) -
   [Documentation](#Documentation) -
   [Todos](#TODOs)
  </div>
  
---

  </div>
  
  

# <div align="center" name="about">myWebsocketApp </div>
### <div align="center">Command driven Symfony6 Websocket Chat Server with VueJS Web and native Android Client</div>
<p align="center">
  <img src="https://github.com/snoke/myWebsocketApp/blob/master/myWebsocketApp.png?raw=true" />
</p>

  
  

##  <br /> <div name="Description"> [^](#menu) Description </div>
Websockets are persistent connections over TCP. 
This is not only a lot faster then typical http requests where a new connection gets established for each request, also this allows live broadcasting to clients.<br /><br />
Project contains a super simple ```server:start```  - Command, a Json Api and a VueJS web and native android client (apk). JWT is used for authentification.<br />

## <br /> <div name="Features"> [^](#menu) Features</div>
* Browser Push Notifications
* Emojis
* Message Status (delivered/seen)
* Image Upload/File Transfer
* live is typing info
* block/unblock chat
* vuejs web and native android client

## <br /> <div name="LiveDemo"> [^](#menu) Live Demo  </div>
browse to https://websocketchat.stefan-sander.online or download the [Native Android Chat Client](#Downloads). <br /><br />
You may use following credientials:
```
alice:test
```
```
bob:test
```

## <br /> <div name="Downloads"> [^](#menu) Downloads </div>
* [Native Android Chat Client (APK)](https://github.com/snoke/myWebsocketApp/raw/master/public/downloads/android-client-latest.apk)  - Live Demo Client

 
## <br /> <div name="Documentation"> [^](#menu) Documentation</div>
###  &nbsp; [^](#menu) Requirements

* webserver (apache2) <br /> 
* database (mysql/mariadb) <br />  
* php <br /> 
* composer <br /> 
* npm <br />
* git <br /> 
* Android Studio to build Native Client <br /> 

<br /> 

###  &nbsp; [^](#menu) Server Installation

&emsp; run following command to checkout the project
```
git clone https://github.com/snoke/myWebsocketApp.git <Webroot> && cd <Webroot>
```
&emsp; edit .env and set server, websocket and database url and a jwt password 
```
SERVER_URL='http://localhost' 
WEBSOCKET_URL='ws://localhost:8080' 
DATABASE_URL="mysql://root@127.0.0.1:3306/myWebsocketChat?serverVersion=mariadb-10.4.11"
JWT_PASSPHRASE=supersecretpassword
```

&emsp; install dependencies, set up database, jwt keypairs and assets
```
npm run install
```

###  <br /> &nbsp; [^](#menu) Start Websocket Server
```
npm run server
```
&emsp; which is an alias of 
```
php bin/console server:start
```


### <br /> &nbsp;  [^](#menu) Build Android Client (Android Package Kit)
&emsp; check https://capacitorjs.com/docs/getting-started/environment-setup and install SDKs and Emulators first

```
npm run build:android
```
&emsp; this script will build the android app, start an emulator with the app and put the .apk into `/public/Downloads`. <br />
&emsp; it will remove all files created during the process

## <br /> <div name="TODOs"> [^](#menu) TODOs</div>
* setup firebase and implement native android notification
* build native ios client 
* add licence 

<hr />
<div align="center">
happy coding :sunglasses:
  </div>
  
