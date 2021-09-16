import React from 'react';
import { useClient } from '../client';
import { MemberParams } from '../../../common/domain/entities/member';

export type MemberHooks = {
  useMemberAction(): {
    addMember: (params: {
      member: MemberParams;
      id: string;
    }) => Promise<MemberParams | undefined>;
    fetchMember: (params: {
      uid: string;
      id: string;
    }) => Promise<MemberParams | undefined>;
    updateMemberStatus: (params: {
      uid: string;
      id: string;
      status: string;
    }) => Promise<Object | undefined>;
    deleteMember: (params: {
      uid: string;
      id: string;
    }) => Promise<Object | undefined>;
  };
};

export const MemberHooksContext = React.createContext<MemberHooks | null>(null);

export const useMemberAction: MemberHooks['useMemberAction'] = () => {
  const client = useClient(MemberHooksContext);
  return client.useMemberAction();
};
