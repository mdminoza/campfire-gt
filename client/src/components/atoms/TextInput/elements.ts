import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import { theme } from '../../../constants';

// Default Values
export const StyledInput: React.FunctionComponent<InputProps> = styled(Input)`
  border: 0;
  border-radius: 0;
  height: auto;
  font-family: ${theme.fonts.fontFamily};
`;

export const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Spacer = styled.div`
  width: 1px;
`;

// for Storybook
export const Wrapper = styled.div`
  width: 300px;
  padding: 20px;
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${theme.colors.blue.primary};
`;
