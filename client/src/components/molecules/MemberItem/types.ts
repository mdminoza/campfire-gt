export interface MemberItemParams {
  uid: string;
  isActive: boolean;
  isSpeaker: boolean;
  isModerator?: boolean;
  isRaising?: boolean;
  onClick: (id: string) => void;
  onClickMenu: (key: string) => void;
  speaker: string;
  profileUrl: string;
  emoji?: string;
  emojiId?: string;
  isLoggedIn?: boolean;
  isMuted?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  peer?: any;
}
