import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { getDatabase,set,ref } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { createContext, useContext } from "react";
import React, { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyDz4qZRGHLoWZR0eip5qAuiVOeXo4q3H1w",
  authDomain: "react-authentication-ea94b.firebaseapp.com",
  projectId: "react-authentication-ea94b",
  storageBucket: "react-authentication-ea94b.appspot.com",
  messagingSenderId: "334391805533",
  appId: "1:334391805533:web:2bc2bb6e2bc6c1e070afb4",
  measurementId: "G-92L91BM2P4"
};

export const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

const firebaseContext = createContext(null);
export const useFirebase = () => useContext(firebaseContext);



export const FirebaseProvider = (props) =>{
    const register = (email,password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const login = (email,password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }
    const puttData = (key,data) =>{
        return set(ref(database,key),data);
    }

    const [logUser,setLogUser] = useState(null);

    useEffect(()=>{
        userIs()
    },[]);

    const userIs = () =>{
        onAuthStateChanged(auth,user=>{
            if(user){
            setLogUser(user);
            }else{
            setLogUser(null);
            }
        })
    }
       
    
    return(
    <firebaseContext.Provider value={{register,puttData,analytics,auth,login,logUser}}>
        {props.children}
    </firebaseContext.Provider>
    )
} 
