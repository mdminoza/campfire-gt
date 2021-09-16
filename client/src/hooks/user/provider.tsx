/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from 'react';
import { UserHooksContext } from '.';
import * as combinedAuthHooks from './combined';

const UserProvider = (props: any): React.ReactElement => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const [activeCampfire, setActiveCampfire] = useState(null);

  const useUserState = {
    currentUser,
    setCurrentUser,
    isLoading,
    setIsLoading,
    token,
    setToken,
    auth,
    setAuth,
    activeCampfire,
    setActiveCampfire,
  };

  const combinedValues = {
    useUserState,
    ...combinedAuthHooks,
  };

  return <UserHooksContext.Provider value={combinedValues} {...props} />;
};

export default UserProvider;
