import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './auth-context';
import { DEMO_CREDENTIALS } from '../constants/faculty';
import { readStorage, removeStorage, writeStorage, STORAGE_KEYS } from '../lib/storage';

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => readStorage(STORAGE_KEYS.auth, false) === true,
  );

  useEffect(() => {
    if (isAuthenticated) writeStorage(STORAGE_KEYS.auth, true);
    else removeStorage(STORAGE_KEYS.auth);
  }, [isAuthenticated]);

  const login = useCallback(({ email, password }) => {
    const emailOk = email.trim().toLowerCase() === DEMO_CREDENTIALS.email.toLowerCase();
    const passwordOk = password === DEMO_CREDENTIALS.password;
    if (emailOk && passwordOk) {
      setIsAuthenticated(true);
      return { ok: true };
    }
    return { ok: false, error: 'Invalid credentials. Please try again.' };
  }, []);

  const logout = useCallback(() => setIsAuthenticated(false), []);

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
