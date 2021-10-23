import React, { useState } from 'react';

export const UserContext = React.createContext();

export function UserContextProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={[isUserLoggedIn, setIsUserLoggedIn]}>
      {children}
    </UserContext.Provider>
  );
}
