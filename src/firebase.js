import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyD2_cnuYvYblQpwQYF6TU8_nyoZhq96vR8",
    authDomain: "bank316money.firebaseapp.com",
    projectId: "bank316money",
    storageBucket: "bank316money.appspot.com",
    messagingSenderId: "78342640537",
    appId: "1:78342640537:web:8a6f63e51f23657cf57908",
    measurementId: "G-662KF0MS56"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound, dispatch) => {
    return getToken(messaging, { vapidKey: 'BC51pXfcI90aRjg9XwQBHuJpWRakrNJ5j6aIWhSwdG2mJrObl5Ie_O8RcoLZqsKFcpoHDeUBXtKdmgzj8ZYcdAE' }).then((currentToken) => {
        if (currentToken) {
            console.log('current token for client: ', currentToken);
            setTokenFound(true);
            localStorage.setItem("notiToken", currentToken);


            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
        } else {
            console.log('No registration token available. Request permission to generate one.');
            setTokenFound(false);
            // shows on the UI that permission is required 
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });