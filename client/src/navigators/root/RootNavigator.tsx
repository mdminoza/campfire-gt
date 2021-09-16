/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ErrorBoundary from '../../components/HOCs/ErrorBoundary';
import { Loader } from '../../components/atoms/Loader';
import { MainPage } from '../../components/pages/MainPage';
import { ActivePage } from '../../components/pages/ActivePage';
import { LoginPage } from '../../components/pages/LoginPage';

import { useUserState, useUserAction } from '../../hooks/user';

const ProtectedRoutes = () => (
  <Routes>
    <Route path="/*" element={<Navigate to="/campfires" />} />
    <Route path="/campfires/active/:id" element={<ActivePage />} />
    <Route path="/campfires" element={<MainPage />} />
  </Routes>
);

const UnprotectedRoutes = () => (
  <Routes>
    <Route path="/*" element={<Navigate to="/campfires/auth" />} />
    <Route path="/campfires/auth" element={<LoginPage />} />
  </Routes>
);

const Navigator = () => {
  const {
    setCurrentUser,
    setIsLoading,
    token: stateToken,
    setToken,
  } = useUserState();
  const { fetchCurrentUser } = useUserAction();

  // TODO: use this to manually logout for testing purposes
  // localStorage.removeItem('access-token');
  // setToken('');

  const token = localStorage.getItem('access-token') || stateToken;

  const { refetch: refetchCurrentUser, isLoading } = useQuery(
    'current-user',
    () => fetchCurrentUser(token),
    {
      enabled: false,
      onSuccess: (response: {
        avatar: string;
        firstName: string;
        lastName: string;
        role: [];
        id: string;
        email: string;
        username: string;
      }) => {
        const {
          id,
          avatar,
          firstName,
          lastName,
          role,
          email,
          username,
        } = response;
        const user = {
          id,
          name: `${firstName} ${lastName}`,
          email,
          profileUrl: avatar,
          role,
          username,
        };
        setCurrentUser(user);
      },
      onError: () => {
        setCurrentUser(undefined);
        localStorage.removeItem('access-token');
        setToken('');
      },
    },
  );

  useEffect(() => {
    if (token) {
      refetchCurrentUser();
    } else {
      setCurrentUser(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, setCurrentUser, refetchCurrentUser]);

  const isLoggedIn = !!token;

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  return (
    <ErrorBoundary
      fallback={(error: any) => <div>ERROR!!! {error?.message}</div>}>
      <BrowserRouter>
        {!isLoading ? (
          isLoggedIn ? (
            <ProtectedRoutes />
          ) : (
            <UnprotectedRoutes />
          )
        ) : (
          <Loader />
        )}
      </BrowserRouter>
    </ErrorBoundary>
  );
};

const RootNavigator = (): React.ReactElement => (
  <React.Suspense fallback={null}>
    <Navigator />
  </React.Suspense>
);

export default RootNavigator;
