import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // create
    const creatUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // sign in
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    // signOut
    const logOut = () => {
        setLoading(true);
       return signOut(auth)
    }


    useEffect( () => {
       const unsubscribe = onAuthStateChanged(auth, currentUser => {
        const userEmail = currentUser?.email || user?.email;
        const loggedUser = {email: userEmail}
            setUser(currentUser);
            console.log('currentUser', currentUser);
            setLoading(false);
            if(currentUser){
                
                axios.post('https://car-doctor-server-gamma-teal.vercel.app/jwt',loggedUser, {withCredentials: true})
                .then(res => {
                    console.log('token', res.data);
                })
            }
            else{
                axios.post('https://car-doctor-server-gamma-teal.vercel.app/logout',loggedUser, {withCredentials: true})
                .then(res => {
                    console.log('token', res.data);
                })
            }
        });
        return () => {
            return unsubscribe;
        }
    },[])

    const authInfo = {
        user,
        loading,
        creatUser,
        signIn,
        logOut,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;