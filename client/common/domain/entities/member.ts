export type MemberParams = {
  profileUrl?: string;
  name?: string;
  email?: string;
  status?: 'pending' | 'invited';
  role?: 'speaker' | 'moderator' | 'audience';
  isRaising?: boolean;
  isMuted?: boolean;
  uid: string;
  campfire?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
