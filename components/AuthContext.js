import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    const checkTokenAndPassword = async () => {
      try {
         // Recupera i dati
         let user = await AsyncStorage.getItem('user');
         let pwd = await AsyncStorage.getItem('pwd');

  
        if (user !== null && user !== '' && pwd !== null && pwd !== '') {
          setUserAuthenticated(true);
        } else {
          setUserAuthenticated(false);
        }
      } catch (error) {
        console.error("Errore durante il recupero del token e della password:", error);
        setUserAuthenticated(false);
      }
    };
  
    checkTokenAndPassword();
  }, []);
  

  const setAuthenticationStatus = (isAuthenticated) => {
    setUserAuthenticated(isAuthenticated);
  };

  return (
    <AuthContext.Provider value={{ userAuthenticated, setAuthenticationStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
