// pages/signin.tsx
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

const SignInPage: React.FC = () => {
  const { data: session } = useSession();

  const handleSignIn = async (provider: string) => {
    await signIn(provider);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      {session ? (
        <div>
          <p>Welcome, {session.user?.name}!</p>
          <p>Email: {session.user?.email}</p>
          <p>Image: {session.user?.image}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <div>
          <button onClick={() => handleSignIn('github')}>Sign In with GitHub</button>
          <button onClick={() => handleSignIn('google')}>Sign In with Google</button>
        </div>
      )}
    </div>
  );
};

export default SignInPage;
