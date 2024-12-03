// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCwO5ui88BCjKDhG0_AaN7zaulyQuS0de4",
  authDomain: "reduccion-de-desperdicios.firebaseapp.com",
  projectId: "reduccion-de-desperdicios",
  storageBucket: "reduccion-de-desperdicios.firebasestorage.app",
  messagingSenderId: "968387224575",
  appId: "1:968387224575:web:6eb5d487fb106869ad3dca"
};

const app = initializeApp(firebaseConfig);
export const storage =getStorage(app)

export function UploadFile(file) {
const storageRef=ref(storage, 'some-child')
uploadBytes(storageRef, file).then(snapshot=>{
    console.log(snapshot);
    
})
    
}


