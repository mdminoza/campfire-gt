import React from 'react';
import styled from 'styled-components';
import { ButtonProps } from 'antd/lib/button';
import { Button as antButton } from 'antd';
import { theme } from '../../../constants';

// Defaut Styling
export const StyledButton: React.FunctionComponent<ButtonProps> = styled(
  antButton,
)`
  display: block;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  font-family: ${theme.fonts.fontFamily};
  outline: none;
  cursor: pointer;
  border: 0;
`;

// Create Campfire Style Button
export const createCampireStyle = {
  paddingVertical: 15,
  flex: 1,
  background: theme.colors.blue.dark,
  color: theme.colors.mainWhite,
  fontWeight: 700,
  fontSize: 18,
};

// for Storybook
export const Container = styled.div`
  width: 300px;
`;
