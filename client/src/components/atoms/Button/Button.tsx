import React from 'react';
import 'antd/dist/antd.css';
import { StyledButton } from './elements';

type Props = {
  onClick: () => void;
  children: React.ReactElement | string;
  style?: Object;
  disabled?: boolean;
};

const Button = ({
  onClick,
  children,
  style = {},
  disabled,
}: Props): React.ReactElement => (
  <StyledButton style={style} onClick={onClick} disabled={disabled}>
    {children}
  </StyledButton>
);

export default Button;
