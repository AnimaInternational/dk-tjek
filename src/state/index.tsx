import firebase from "firebase/app";
import "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../axios";
import { firebaseAuth } from "../firebase";

interface GlobalError {
  message: string;
}

type User = firebase.User;

export interface StateContextType {
  error: GlobalError | null;
  setError(error: GlobalError | null): void;
  user: User | null | undefined;
  isAdmin: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  reauthenticate(password: string): Promise<void>;
}

export const StateContext = createContext<StateContextType>(null!);

export default function AppStateProvider(props: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null | undefined>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [error, setError] = useState<GlobalError | null>(null);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const { token, claims } = await user.getIdTokenResult();
        setIsAdmin(claims.admin);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      setUser(user || null);
    });
  }, []);

  const signIn: StateContextType["signIn"] = async (
    email: string,
    password: string
  ) => {
    const response = await firebaseAuth.signInWithEmailAndPassword(
      email,
      password
    );
    if (response.user) {
      const { token, claims } = await response.user.getIdTokenResult();
      setIsAdmin(claims.admin);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setUser(response.user || null);
  };

  const signOut: StateContextType["signOut"] = async () => {
    await firebaseAuth.signOut();
    setUser(null);
  };

  const reauthenticate: StateContextType["reauthenticate"] = async (
    password
  ) => {
    if (!user || !user.email) throw new Error("No user logged in");
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );
    const response = await user.reauthenticateWithCredential(credential);
    if (response.user) {
      const { token, claims } = await response.user.getIdTokenResult();
      setIsAdmin(claims.admin);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setUser(response.user || null);
  };

  const contextValue: StateContextType = {
    error,
    setError,
    user,
    isAdmin,
    signIn,
    signOut,
    reauthenticate,
  };

  return (
    <StateContext.Provider value={{ ...contextValue }}>
      {props.children}
    </StateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppStateProvider");
  }
  return context;
}
