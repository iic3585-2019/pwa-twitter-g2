# Contexto
Esta aplicación consiste en un twitter en donde al escribir un mensaje y enviarlo se actualiza en la base de datos de firebase y en caso de tener la aplicación en segundo plano llega una notifiacion push. Esta aplicación funciona en todos los navegadores excepto en internet explorer y safari y en modo mobile solo en android.

#Partes interesantes del código
Lo más destacable es el uso de service worker el cual al correr la aplicación, el navegador lo escucha, la configuración de este se encuentra en src/sw.js

```bash
    // Firebase messaging
    importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
    importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

    firebase.initializeApp({
    apiKey: 'AIzaSyDPyYczw1sWppmj_MNqQAyROTgydtd1aN4',
    authDomain: 'pwa-twitter-4ddd4.firebaseapp.com',
    databaseURL: 'https://pwa-twitter-4ddd4.firebaseio.com',
    projectId: 'pwa-twitter-4ddd4',
    storageBucket: 'pwa-twitter-4ddd4.appspot.com',
    messagingSenderId: '825325030164',
    });

    const messaging = firebase.messaging();
```
Con esto se enlaza la app de firebase con esta aplicación y se activa el servicio de mensajeria de firebase

#Ejecutar la aplicacion en modo development

```bash
yarn install
```

```bash
yarn serve
```

Esto ejecutara la aplicacion en el puerto 8080

#Realizar un deploy

```bash
yarn build
```

```bash
firebase login
```

```bash
firebase deploy
```

#Entrar en la aplicación ya montada

Basta con ingresar al siguiente link "https://pwa-twitter-4ddd4.firebaseapp.com/" para poder ejecutar la aplicación
