// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {

    apiKey: "AIzaSyD2_cnuYvYblQpwQYF6TU8_nyoZhq96vR8",
    authDomain: "bank316money.firebaseapp.com",
    projectId: "bank316money",
    storageBucket: "bank316money.appspot.com",
    messagingSenderId: "78342640537",
    appId: "1:78342640537:web:8a6f63e51f23657cf57908",
    measurementId: "G-662KF0MS56"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});