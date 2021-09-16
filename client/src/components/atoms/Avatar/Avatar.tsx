import React, { ReactNode } from 'react';
import 'antd/dist/antd.css';
import {
  StyledAvatar,
  Badge,
  AvatarContainer,
  NameWrapper,
  Name,
} from './elements';
import { AvatarIcon } from '../Icons';

type Props = {
  src?: string | ReactNode;
  alt?: string;
  badge?: string;
  size?: number;
  name?: string;
};

const Avatar = ({
  alt,
  badge,
  size = 45,
  src = <AvatarIcon />,
  name,
}: Props): React.ReactElement => (
  <AvatarContainer>
    {badge ? <Badge>{badge}</Badge> : null}
    <StyledAvatar
      className="styledAvatar"
      src={src}
      alt={alt || ''}
      size={size}
    />
    {name && (
      <NameWrapper>
        <Name>{name}</Name>
      </NameWrapper>
    )}
  </AvatarContainer>
);

export default Avatar;
