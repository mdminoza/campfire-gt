import { useCallback } from 'react';
import { MemberHooks } from '../index';
import axios from '../../../config/axios';
import urls from '../../../constants/urls';
import { MemberParams } from '../../../../common/domain/entities/member';

export const useMemberAction: MemberHooks['useMemberAction'] = () => {
  const addMember = useCallback(
    async (params: { member: MemberParams; id: string }) => {
      try {
        const res = await axios.patch(`${urls.member.add}`, params);
        if (res && res?.status === 201) {
          return res.data;
        }
        return null;
      } catch (e: any) {
        throw new Error(e);
      }
    },
    [],
  );

  const fetchMember = useCallback(
    async (params: { uid: string; id: string }) => {
      try {
        const res = await axios.post(`${urls.member.get}`, params);
        if (res && res?.status === 200) {
          return res.data?.message === 'Campfire or user id does not exist.'
            ? null
            : res.data;
        }
        return null;
      } catch (e: any) {
        throw new Error(e);
      }
    },
    [],
  );

  const updateMemberStatus = useCallback(
    async (params: { uid: string; id: string; status: string }) => {
      try {
        const res = await axios.patch(`${urls.member.setStatus}`, params);
        if (res && res?.status === 200) {
          return res.data;
        }
        return null;
      } catch (e: any) {
        throw new Error(e);
      }
    },
    [],
  );

  const deleteMember = useCallback(
    async (params: { uid: string; id: string }) => {
      try {
        const res = await axios.patch(`${urls.member.delete}`, params);
        if (res && res?.status === 200) {
          return res.data;
        }
        return null;
      } catch (e: any) {
        throw new Error(e);
      }
    },
    [],
  );

  return {
    addMember,
    fetchMember,
    updateMemberStatus,
    deleteMember,
  };
};
