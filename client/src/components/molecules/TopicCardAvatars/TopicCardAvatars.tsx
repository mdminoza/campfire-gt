import React from 'react';
import { Avatar } from '../../atoms/Avatar';
import {
  Container,
  StyledCol,
  StyledRow,
  StyledText,
  TextWrapper,
} from './elements';

type Props = {
  avatarMembers: Array<{
    id: string;
    profileUrl?: string;
    isVerified?: boolean;
  }>;
};

const TopicCardAvatars = ({ avatarMembers }: Props): React.ReactElement => {
  const renderAvatar = (): React.ReactElement[] => {
    const elements: React.ReactElement[] = [];
    const left = avatarMembers.length - 6;
    try {
      for (let i = 1; i <= 6; i++) {
        elements.push(
          <StyledCol>
            {i === 6 && left > 1 ? (
              <TextWrapper>
                <StyledText heading>+ {left}</StyledText>
                <StyledText>others</StyledText>
              </TextWrapper>
            ) : (
              <Avatar src={avatarMembers[i].profileUrl} size={37} />
            )}
          </StyledCol>,
        );
      }
    } catch (err) {
      console.log(err);
    }
    return elements;
  };

  return (
    <Container>
      <Avatar src={avatarMembers[0].profileUrl} size={80} />
      {avatarMembers && avatarMembers.length > 1}
      <StyledRow gutter={[6, 6]}>{renderAvatar()}</StyledRow>
    </Container>
  );
};

export default TopicCardAvatars;
