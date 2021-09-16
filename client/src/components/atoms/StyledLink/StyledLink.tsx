import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { theme } from '../../../constants';

const AntdLink = styled(Link)`
  font-style: normal;
  font-weight: bold;
  font-size: 1.18rem;
  line-height: 25px;

  text-align: center;
  letter-spacing: 0.02em;
  text-decoration: none;
  padding: 0 8px;
`;

type Props = {
  style?: React.CSSProperties;
  onClick: () => void;
  label: string;
  to: string;
  active?: boolean;
};

const StyledLink = ({
  style,
  label,
  onClick,
  to,
  active,
}: Props): React.ReactElement => {
  const linkStyle = {
    ...style,
    color: active ? theme.colors.blue.primary : theme.colors.mainBlack,
  };

  return (
    <AntdLink style={linkStyle} onClick={onClick} to={to}>
      {label}
    </AntdLink>
  );
};

export default StyledLink;
