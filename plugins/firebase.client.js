import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin(()=>{

    const firebaseConfig = {
        apiKey: "AIzaSyCUKav59m8NdyTA0biFtCc4PRaXGlszDdE",
        authDomain: "habits-10247.firebaseapp.com",
        projectId: "habits-10247",
        storageBucket: "habits-10247.firebasestorage.app",
        messagingSenderId: "968577767027",
        appId: "1:968577767027:web:5f53101c93feb3dc2bfc06",
        measurementId: "G-B7WQZEJNXG"
      };
      
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      return{
        provide: {
          firebaseApp: app,db
        }
      }
})

