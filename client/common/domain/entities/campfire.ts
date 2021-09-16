import { BaseModel } from './baseModel';

export type CampfireParams = {
  topic: string;
  description: string;
  openTo?: 'Everyone' | 'Invite Only';
  scheduleToStart: Date;
  hidden: boolean;
  status?: 'pending' | 'invited' | '';
  isLoading?: boolean;
  invited?: Object[];
  isSponsored?: boolean;
  duration?: string;
  creator?: {
    uid: string;
    profileUrl: string;
    name: string;
  };
  totalMembers?: number;
  members?: Object[];
};

export type Campfire = CampfireParams & BaseModel;
