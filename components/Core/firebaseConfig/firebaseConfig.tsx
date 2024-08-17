import React from 'react'
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAhikt569I2wH2Qz7EcNmqJYIKvn-RF18I",
    authDomain: "ashma-78c83.firebaseapp.com",
    projectId: "ashma-78c83",
    storageBucket: "ashma-78c83.appspot.com",
    messagingSenderId: "212188669972",
    appId: "1:212188669972:web:310a1fb2c53b6b3b969f01"
  };


 export const app = initializeApp(firebaseConfig);
 export const database = getDatabase(app);