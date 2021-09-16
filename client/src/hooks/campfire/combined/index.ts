import { useCallback } from 'react';
import { CampfireHooks } from '../index';
import axios from '../../../config/axios';
import urls from '../../../constants/urls';
import {
  CampfireParams,
  Campfire,
} from '../../../../common/domain/entities/campfire';
// import { TodoParams } from '../../../../common/domain/entities/todo';

export const useCampfireAction: CampfireHooks['useCampfireAction'] = () => {
  const fetchCampfires = useCallback(async () => {
    try {
      const res = await axios.get(`${urls.campfire.main}`);
      if (res && res?.status === 200) {
        return res.data;
      }
      return [];
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  const fetchOwnedCampfires = useCallback(async (cid: string) => {
    try {
      const res = await axios.get(`${urls.campfire.owned}?cid=${cid}`);
      if (res && res?.status === 200) {
        const result = res.data.map((value: Campfire) => {
          let totalMembers = 0;
          if (value.members && value.members?.length > 0) {
            totalMembers =
              value.members?.filter((val: any) => val.status !== 'pending')
                .length || 0;
          }

          return {
            ...value,
            totalMembers,
          };
        });
        return result;
      }
      return [];
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  const fetchPublicCampfires = useCallback(async (cid: string) => {
    try {
      const res = await axios.get(`${urls.campfire.public}?cid=${cid}`);
      if (res && res?.status === 200) {
        const result: any = await Promise.all(
          res.data.map(async (value: Campfire) => {
            const member = await axios.post(`${urls.member.get}`, {
              uid: cid,
              // eslint-disable-next-line no-underscore-dangle
              id: value._id,
            });
            let totalMembers = 0;
            if (value.members && value.members?.length > 0) {
              totalMembers =
                value.members?.filter((val: any) => val.status !== 'pending')
                  .length || 0;
            }

            return {
              ...value,
              status: member.data.status || 'uninvited',
              totalMembers,
            };
          }),
        );
        return result;
      }
      return [];
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  const fetchPrivateCampfires = useCallback(async (cid: string) => {
    try {
      const res = await axios.get(`${urls.campfire.private}?cid=${cid}`);
      if (res && res?.status === 200) {
        const result: any = await Promise.all(
          res.data.map(async (value: Campfire) => {
            const member = await axios.post(`${urls.member.get}`, {
              uid: cid,
              // eslint-disable-next-line no-underscore-dangle
              id: value._id,
            });
            let totalMembers = 0;
            if (value.members && value.members?.length > 0) {
              totalMembers =
                value.members?.filter((val: any) => val.status !== 'pending')
                  .length || 0;
            }
            return {
              ...value,
              status: member.data.status || undefined,
              totalMembers,
            };
          }),
        );
        return result;
      }
      return [];
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  const addCampfire = useCallback(async (campfire: CampfireParams) => {
    try {
      const res = await axios.post(`${urls.campfire.main}`, campfire);
      if (res && res?.status === 201) {
        return res.data;
      }
      return null;
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  const searchCampfires = useCallback(
    async (cid: string, tpc: string, type: 'public' | 'private' | 'owned') => {
      try {
        const url =
          // eslint-disable-next-line no-nested-ternary
          type === 'owned'
            ? `${urls.campfire.owned}`
            : type === 'private'
            ? `${urls.campfire.private}`
            : `${urls.campfire.public}`;

        const res = await axios.get(`${url}?cid=${cid}&tpc=${tpc}`);
        if (res && res?.status === 200) {
          const result: any = await Promise.all(
            res.data.map(async (value: Campfire) => {
              const member = await axios.post(`${urls.member.get}`, {
                uid: cid,
                // eslint-disable-next-line no-underscore-dangle
                id: value._id,
              });

              let totalMembers = 0;
              if (value.members && value.members?.length > 0) {
                totalMembers =
                  value.members?.filter((val: any) => val.status !== 'pending')
                    .length || 0;
              }

              return {
                ...value,
                status: member.data.status || 'uninvited',
                totalMembers,
              };
            }),
          );
          return result;
        }
        return null;
      } catch (e: any) {
        throw new Error(e);
      }
    },
    [],
  );

  const fetchCampfire = useCallback(async (id: string) => {
    try {
      const res = await axios.get(`${urls.campfire.main}${id}`);
      if (res && res?.status === 200) {
        return res.data;
      }
      return null;
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  const fetchCampfireMembers = useCallback(async (id: string) => {
    try {
      if (id) {
        const res = await axios.get(`${urls.campfire.main}${id}/member`);
        if (res && res?.status === 200) {
          return res.data;
        }
        return null;
      }
      return null;
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  const deleteCampfire = useCallback(async (id: string) => {
    try {
      const res = await axios.delete(`${urls.campfire.main}${id}`);
      if (res && res?.status === 200) {
        return res.data;
      }
      return null;
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  return {
    fetchCampfires,
    fetchOwnedCampfires,
    fetchPublicCampfires,
    fetchPrivateCampfires,
    addCampfire,
    searchCampfires,
    fetchCampfire,
    fetchCampfireMembers,
    deleteCampfire,
  };
};
