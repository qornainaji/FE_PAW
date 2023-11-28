// auth.js

import { useRouter } from 'next/router';
import cookieCutter from 'cookie-cutter';

export const checkAuthentication = ( router ) => {
  const token = cookieCutter.get('token');

  if (!token) {
    router.push('/auth/login');
  }
};
