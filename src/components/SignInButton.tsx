import React from "react";

import { useAuth } from "../AuthContext";

const SignInButton = () => {
  const { user, signInWithGoogle, handleSignOut } = useAuth();

  if (user) {
    return (
      <div>
        <small>{user.email}</small>
        <br />
        <button onClick={handleSignOut}>Odhlásit se</button>
      </div>
    );
  }

  return <button onClick={signInWithGoogle}>Log in</button>;
};

export default SignInButton;
