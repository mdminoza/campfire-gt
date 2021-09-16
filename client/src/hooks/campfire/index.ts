import React from 'react';
import { useClient } from '../client';
import {
  CampfireParams,
  Campfire,
} from '../../../common/domain/entities/campfire';
import { MemberParams } from '../../../common/domain/entities/member';

export type CampfireHooks = {
  useCampfireAction(): {
    fetchCampfires: () => Promise<[] | undefined>;
    addCampfire: (campfire: CampfireParams) => Promise<Campfire | undefined>;
    fetchOwnedCampfires: (cid: string) => Promise<[] | undefined>;
    fetchPublicCampfires: (cid: string) => Promise<[] | undefined>;
    fetchPrivateCampfires: (cid: string) => Promise<[] | undefined>;
    searchCampfires: (
      cid: string,
      tpc: string,
      type: 'public' | 'private' | 'owned',
    ) => Promise<[] | undefined>;
    fetchCampfire: (id: string) => Promise<Campfire | undefined>;
    fetchCampfireMembers: (id: string) => Promise<MemberParams[] | undefined>;
    deleteCampfire: (id: string) => Promise<{} | undefined>;
  };
};

export const CampfireHooksContext = React.createContext<CampfireHooks | null>(
  null,
);

export const useCampfireAction: CampfireHooks['useCampfireAction'] = () => {
  const client = useClient(CampfireHooksContext);
  return client.useCampfireAction();
};
