import { useCallback } from 'react';
import axios from 'axios';
import axiosInstance from '../../../config/axios';
import { UserHooks } from '../index';
// import axios from '../../../config/axios';
import urls from '../../../constants/urls';
// import { TodoParams } from '../../../../common/domain/entities/todo';

export const useUserAction: UserHooks['useUserAction'] = () => {
  const loginUser = useCallback(async (username: string, password: string) => {
    try {
      const res = await axios.post(urls.web.jwt, {
        username,
        password,
      });
      return res.data.token;
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  const fetchCurrentUser = useCallback(async (token: string) => {
    try {
      const userUrl = urls.web.dev + urls.user.current;
      const res = await axios.get(userUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  const fetchRandomTestUser = useCallback(async () => {
    try {
      const res = await axiosInstance.get(urls.user.randomTestUser);
      return res.data;
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  return {
    loginUser,
    fetchCurrentUser,
    fetchRandomTestUser,
  };
};
