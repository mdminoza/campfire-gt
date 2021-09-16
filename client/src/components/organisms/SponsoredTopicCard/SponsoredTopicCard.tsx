import React from 'react';
import { Divider } from 'antd';
import { Avatar } from '../../atoms/Avatar';
import { Button } from '../../atoms/Button';
import {
  Container,
  Column,
  AvatarWrapper,
  Title,
  Subtitle,
  DescWrapper,
  MembersCountText,
  MembersCountSubText,
  BtnTitle,
  btnStyleUninvited,
  DividerStyle,
  Description,
  MembersCountWrapper,
} from './elements';

type Props = {
  profileURL: string;
  title: string;
  desc: string;
  // date: Date;
  // isStarted: boolean;
  // isFeatured: boolean;
  // isOwned?: boolean;
  // isLoading?: boolean;
  // status?: 'pending' | 'invited' | '';
  onClick: (isOwned?: boolean) => void;
};

const SponsoredTopicCard = ({
  profileURL,
  // isStarted,
  title,
  desc,
  // date,
  // isFeatured,
  // isOwned = false,
  // isLoading = false,
  // status = '',
  onClick,
}: Props): React.ReactElement => (
  <Container>
    <Column>
      <AvatarWrapper>
        <Avatar src={profileURL} size={180} />
      </AvatarWrapper>
      <Title>{title}</Title>
      <Subtitle>John Cena</Subtitle>
    </Column>
    <DescWrapper>
      <MembersCountWrapper>
        <MembersCountText>+75</MembersCountText>
        <MembersCountSubText>others</MembersCountSubText>
      </MembersCountWrapper>
      <Divider type="vertical" style={DividerStyle} />
      <Description>{desc}</Description>
    </DescWrapper>
    <Column>
      <Button onClick={onClick} style={btnStyleUninvited}>
        <BtnTitle>JOIN NOW</BtnTitle>
      </Button>
    </Column>
  </Container>
);

export default SponsoredTopicCard;
