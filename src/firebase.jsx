import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyCoP-E6BcuiaLtxOZ2yPk9P5XTfr_nsNLI",
    authDomain: "lcp-mobile-8c400.firebaseapp.com",
    databaseURL: "https://lcp-mobile-8c400-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lcp-mobile-8c400",
    storageBucket: "lcp-mobile-8c400.appspot.com",
    messagingSenderId: "149944529698",
    appId: "1:149944529698:web:e240c795593c60a9012b7b",
    measurementId: "G-8JQ0WPQN16"
});

export const auth = app.auth();
export default app;