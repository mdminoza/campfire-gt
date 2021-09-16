import React from 'react';
import { Row, Col } from 'antd';
import { MemberItem } from '../../molecules/MemberItem';
import { InviteMemberItem } from '../../molecules/InviteMemberItem';
import { AnimatedEmoji } from '../../molecules/AnimatedEmoji';
import {
  StyledCard,
  TitleWrapper,
  // Title,
  SpeakersWrapper,
  SubWrapper,
  Wrapper,
  SubTitle,
  NoSpeakerWrapper,
  // LeaveButton,
  // ButtoWrapper,
  // LinkWrapper,
} from './elements';
import { MemberItemParams } from '../../molecules/MemberItem/types';

// import styled from 'styled-components';
// import { theme } from '../../../constants';

// const ModeratorWrapper = styled.div`
//   margin: 0 40px 0;
//   text-align: right;
//   padding-right: 12px;
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   background-color: ${(props: { hasInvites: boolean | undefined }) =>
//     props.hasInvites ? theme.colors.gray.dark : 'transparent'};
//   padding: 8px;
//   justify-content: flex-end;
//   align-items: center;
// `;

// const ModeratorNameWrapper = styled.span`
//   padding-right: 4px;
// `;

// const ModeratorLabel = styled.span`
//   font-style: normal;
//   font-weight: normal;
//   font-size: 14px;
//   line-height: 16px;
//   letter-spacing: 0.02em;
//   color: ${theme.colors.mainBlack};
//   padding-right: 4px;
// `;

// const ModeratorName = styled.span`
//   font-style: normal;
//   font-weight: bold;
//   font-size: 14px;
//   line-height: 16px;
//   letter-spacing: 0.02em;
//   color: ${theme.colors.mainBlack};
// `;

type Props = {
  data: Array<MemberItemParams>;
  invites?: Array<MemberItemParams>;
  onClick: (id: string) => void;
  selectedId: string;
  size?: number;
};

const SpeakersArea = ({
  data,
  invites,
  selectedId,
  onClick,
  size,
}: Props): React.ReactElement => (
  // const renderModerators = (items) => {
  //   return items.map((item, index) => (
  //     <ModeratorNameWrapper>
  //       <ModeratorName>{item.speaker.toUpperCase()}</ModeratorName>
  //       {items.length === 1 || items.length - 1 === index ? '' : ','}
  //     </ModeratorNameWrapper>
  //   ));
  // };

  <Wrapper>
    <StyledCard>
      {/* <ButtoWrapper>
          <LinkWrapper to="">
            <LeaveButton>LEAVE CAMPFIRE</LeaveButton>
          </LinkWrapper>
        </ButtoWrapper> */}
      {/* <TitleWrapper>
          <Title>SPEAKERS</Title>
        </TitleWrapper> */}
      {/* <TitleWrapper>
          <Title>huhu</Title>
        </TitleWrapper> */}
      <SpeakersWrapper>
        {data && data.length > 0 ? (
          <Row gutter={[20, 16]} justify="center">
            {data.map((value) => (
              <Col>
                <AnimatedEmoji
                  emoji={value.emoji || ''}
                  emojiId={value.emojiId || ''}
                />
                <MemberItem
                  id={value.uid}
                  profileUrl={value.profileUrl}
                  onClickMenu={value.onClickMenu}
                  speaker={value.speaker}
                  onClick={onClick}
                  isSpeaker
                  isModerator={value.isModerator}
                  isActive={value.isActive}
                  selectedId={selectedId}
                  size={size || 140}
                  peer={value?.peer}
                  isLoggedIn={value?.isLoggedIn}
                />
              </Col>
            ))}
            <br />
          </Row>
        ) : (
          <NoSpeakerWrapper>No speakers yet</NoSpeakerWrapper>
        )}
        {/* TODO Loading indicator */}
      </SpeakersWrapper>
    </StyledCard>
    {/* {data && data.length > 0 && data.some((value) => value.isModerator) && (
        <ModeratorWrapper hasInvites={invites && invites.length > 0}>
          <ModeratorLabel>MODERATOR:</ModeratorLabel>
          {renderModerators(data.filter((val) => val.isModerator))}
        </ModeratorWrapper>
      )} */}
    {invites && invites.length > 0 && (
      <SubWrapper>
        <TitleWrapper>
          <SubTitle>PENDING INVITES</SubTitle>
        </TitleWrapper>
        <SpeakersWrapper>
          <Row gutter={[16, 16]} justify="center">
            {invites.map((value) => (
              <Col>
                <InviteMemberItem
                  name={value.speaker}
                  selectedId={selectedId}
                  id={value.uid}
                  url={value.profileUrl}
                  onClickMenu={value.onClickMenu}
                  onClick={onClick}
                />
              </Col>
            ))}
          </Row>
        </SpeakersWrapper>
      </SubWrapper>
    )}
  </Wrapper>
);
export default SpeakersArea;
