import React from 'react';
import styled from 'styled-components';
import { TextAreaProps } from 'antd/lib/input';
import { Input } from 'antd';
import { theme } from '../../../constants';

const { TextArea } = Input;

// Default Values
export const StyledTextArea: React.FunctionComponent<TextAreaProps> = styled(
  TextArea,
)`
  border-radius: 0;
  font-family: ${theme.fonts.fontFamily};
`;

// for storybook
export const Container = styled.div`
  width: 350px;
`;
