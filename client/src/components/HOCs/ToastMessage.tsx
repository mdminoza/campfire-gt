import React from 'react';
import styled from 'styled-components';
import { notification } from 'antd';

import { theme } from '../../constants';

const SuccessNotifStyle = {
  background: `#f5ffef`,
  border: `1px solid #b4ea9a`,
  borderRadius: '4px',
  boxShadow: 'none',
} as React.CSSProperties;

const ErrorNotifStyle = {
  backgroundColor: `#ffe6e4`,
  border: `1px solid #ffccc8`,
  borderRadius: '4px',
  boxShadow: 'none',
} as React.CSSProperties;

const Message = styled.div`
  font-family: ${theme.fonts.fontFamily};
  font-style: normal;
  font-size: 16px;
  color: ${theme.colors.mainBlack};
`;

const Description = styled.div`
  font-family: ${theme.fonts.fontFamily};
  font-style: normal;
  font-size: 16px;
  line-height: 23px;
  color: ${theme.colors.mainBlack};
  padding: 10px 0 20px 0;
`;

export const ToastMessage = (
  type: 'success' | 'error',
  message: string,
  description: string,
  duration?: number,
): void => {
  notification[type]({
    message: <Message>{message}</Message>,
    description: <Description>{description}</Description>,
    closeIcon: <></>,
    style: type === 'success' ? SuccessNotifStyle : ErrorNotifStyle,
    duration: duration || 3,
  });
};
