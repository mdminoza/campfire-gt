import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { AvatarProps } from 'antd/lib/avatar';
import { theme } from '../../../constants';

// Default Styling
export const StyledAvatar: React.FunctionComponent<AvatarProps> = styled(
  Avatar,
)`
  border-radius: 0;
  background: ${theme.colors.gray.light};
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Notification Badge
export const Badge = styled.div`
  z-index: 1;
  top: 0;
  position: absolute;
  left: -13px;
  padding: 2px 7px;
  font-weight: 700;
  color: ${theme.colors.mainWhite};
  background-color: ${theme.colors.blue.primary};
`;

export const AvatarContainer = styled.a`
  text-decoration: none;
  position: relative;
`;

export const NameWrapper = styled.div`
  text-align: center;
  width: 100%;
`;

export const Name = styled.span`
  font-family: ${theme.fonts.fontFamily};
  font-weight: 300;
  font-size: 0.7rem;
  color: ${theme.colors.mainBlack};
`;

// for Storybook
export const Container = styled.div`
  padding-left: 20px;
`;
