import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getStorage} from 'firebase/storage';
import { getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBmYWRQmOByWx5VlnB7Sh14C3o91KOrg_s",
    authDomain: "app-noticias-a86d0.firebaseapp.com",
    projectId: "app-noticias-a86d0",
    storageBucket: "app-noticias-a86d0.appspot.com",
    messagingSenderId: "47679001741",
    appId: "1:47679001741:web:d61368a114f67d2b7ebec4",
    measurementId: "G-SY6RFWSH7Y"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

  export{db, auth, storage};

  const Firebase = () => {
      return null;
    };
    
    export default Firebase;