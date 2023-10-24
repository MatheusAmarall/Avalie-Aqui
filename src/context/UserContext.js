import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [nomeUsuario, setNomeUsuario] = useState('');

  return (
    <UserContext.Provider value={{ nomeUsuario, setNomeUsuario }}>
      {children}
    </UserContext.Provider>
  );
}