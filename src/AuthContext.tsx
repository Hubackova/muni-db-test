// @ts-nocheck
import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Typ kontextu
// interface AuthContextType {
//   user: User | null;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
//   canEdit: boolean | null;
//   setCanEdit: React.Dispatch<React.SetStateAction<boolean | null>>;
// }

const AuthContext = createContext<any | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [canEdit, setCanEdit] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const allowedEmails = ["mekkysi.databaze@gmail.com"];

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Už není třeba volat setCanEdit tady, bude to řešit onAuthStateChanged
        console.log("Přihlášen:", result.user.email);
      })
      .catch((error) => {
        console.error("Chyba při přihlášení:", error.message);
      });
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("Odhlášen");
      setCanEdit(false);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser?.email) {
        const canEditNow = allowedEmails.includes(firebaseUser.email);
        setCanEdit(canEditNow);
        console.log(
          "onAuthStateChanged: user =",
          firebaseUser.email,
          "canEdit =",
          canEditNow
        );
      } else {
        setCanEdit(false);
      }
      navigate("/");
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, canEdit, signInWithGoogle, handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
