/* eslint-disable no-nested-ternary */
import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';

import { Avatar } from '../../atoms/Avatar';
import { Button } from '../../atoms/Button';
// import { Audio } from '../../atoms/Icons';
// import { TopicCardAvatars } from '../../molecules/TopicCardAvatars';
import { members } from '../../molecules/TopicCardAvatars/stories'; // temporary items

import {
  StyledCard,
  Column,
  CardTitle,
  DescDate,
  CardDesc,
  BtnTitle,
  btnStyleInvited,
  btnStyleUninvited,
  btnStyleWaiting,
  btnStyleImInterested,
  btnStylePreRegistered,
  CardInfoWrapper,
  IconWrapper,
  EmptySpace,
  AvatarContainer,
  MembersCountText,
  MembersCountSubText,
  TextWrapper,
  DurationTitle,
} from './elements';

import { getDayAndTime } from '../../../utils/helpers/date';

type Props = {
  profileURL: string;
  // TODO: For displaying membes avatar when featured..
  // members?: Array<{
  //   id: string;
  //   profileUrl?: string;
  // }>;
  title: string;
  desc: string;
  date: Date;
  isStarted: boolean;
  isFeatured: boolean;
  isOwned?: boolean;
  isLoading?: boolean;
  onClick: (isOwned?: boolean) => void;
  status?: 'pending' | 'invited' | 'uninvited' | '';
  totalMembers?: number;
};

const TopicCard = ({
  profileURL,
  isStarted,
  title,
  desc,
  date,
  isFeatured,
  isOwned = false,
  isLoading = false,
  onClick,
  status = '',
  totalMembers = 0,
}: Props): React.ReactElement => {
  const TopicDate = getDayAndTime(date);

  const loadingStyle = {
    fontSize: 27,
  };

  const renderButton = () =>
    isStarted && (status === 'invited' || status === 'uninvited') ? (
      <Button onClick={onClick} style={btnStyleInvited}>
        <IconWrapper>
          {/* {isFeatured && <Audio fill={'#ffffff'} />}
          {isFeatured && <Spacer />} */}
          <BtnTitle>JOIN NOW</BtnTitle>
        </IconWrapper>
      </Button>
    ) : isStarted && !status ? (
      <Button onClick={onClick} style={btnStyleUninvited}>
        {/* <BtnTitle>NOW | REQUEST INVITE</BtnTitle> */}
        <BtnTitle>ASK TO JOIN</BtnTitle>
      </Button>
    ) : isStarted && status === 'pending' ? (
      <Button onClick={() => {}} disabled style={btnStyleWaiting}>
        {/* <BtnTitle>NOW | INVITE REQUESTED</BtnTitle> */}
        <BtnTitle>WAITING FOR APPROVAL</BtnTitle>
      </Button>
    ) : !isStarted && (status === 'pending' || status === 'invited') ? (
      <Button onClick={() => {}} disabled style={btnStylePreRegistered}>
        <IconWrapper>
          {/* TODO: New Pre - RegisterFlow */}
          {/* {isFeatured && <Audio fill={'#ffffff'} />}
          {isFeatured && <Spacer />} */}
          <BtnTitle>PRE - REGISTERED</BtnTitle>
        </IconWrapper>
      </Button>
    ) : (
      <Button onClick={onClick} style={btnStyleImInterested}>
        <IconWrapper>
          {/* {isFeatured && <Audio fill={'#ffffff'} />}
          {isFeatured && <Spacer />} */}
          <BtnTitle>IM INTERESTED</BtnTitle>
        </IconWrapper>
      </Button>
    );

  return (
    <StyledCard isFeatured={isFeatured}>
      <Column>
        {isFeatured ? (
          // TODO: use of temporary variable and should be replaced soon
          // <TopicCardAvatars avatarMembers={members} />
          <AvatarContainer>
            <Avatar src={profileURL} size={70} />
            {totalMembers > 0 && (
              <IconWrapper>
                <TextWrapper>
                  <MembersCountText>+ {totalMembers}</MembersCountText>
                  <MembersCountSubText>
                    {totalMembers > 1 ? 'others' : 'other'}
                  </MembersCountSubText>
                </TextWrapper>
              </IconWrapper>
            )}
          </AvatarContainer>
        ) : (
          <Avatar src={profileURL} size={70} />
        )}
      </Column>
      <Column>
        <CardInfoWrapper>
          <CardTitle>{title}</CardTitle>
          {isStarted ? (
            <DurationTitle>
              {`STARTED: ${moment(
                moment(date).format('YYYYMMDD HH:mm:ss'),
                'YYYYMMDD HH:mm:ss',
              )
                .fromNow()
                .toString()}`}
            </DurationTitle>
          ) : (
            <DescDate>{TopicDate}</DescDate>
          )}
          <CardDesc>{desc}</CardDesc>
        </CardInfoWrapper>
      </Column>
      <EmptySpace />
      <Column>
        {isLoading ? (
          <Spin indicator={<LoadingOutlined style={loadingStyle} spin />} />
        ) : isOwned && isStarted ? (
          <Button onClick={() => onClick(true)} style={btnStyleInvited}>
            <IconWrapper>
              {/* {isFeatured && <Audio fill={'#ffffff'} />}
              {isFeatured && <Spacer />} */}
              <BtnTitle>JOIN NOW</BtnTitle>
            </IconWrapper>
          </Button>
        ) : isOwned && !isStarted ? (
          <></>
        ) : (
          renderButton()
        )}
      </Column>
    </StyledCard>
  );
};

export default TopicCard;
