import React, { ReactElement, ReactNode } from 'react';
import 'antd/dist/antd.css';
import { StyledInput, InputWrapper, Spacer } from './elements';

type Props = {
  size?: 'small' | 'middle' | 'large' | undefined;
  placeholder?: string;
  prefix?: ReactElement;
  suffix?: React.ReactElement;
  value: string;
  type?: string;
  addonBefore?: ReactNode;
  maxLength?: number;
  onChange: (value: string) => void;
};

const TextInput = ({
  size,
  placeholder = '',
  prefix,
  suffix,
  value,
  type,
  addonBefore,
  onChange,
  maxLength,
}: Props): React.ReactElement => (
  <InputWrapper>
    {addonBefore}
    {addonBefore ? <Spacer /> : null}
    <StyledInput
      size={size}
      placeholder={placeholder}
      prefix={prefix}
      suffix={suffix}
      value={value}
      type={type}
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
        onChange(ev.target.value)
      }
      maxLength={maxLength}
    />
  </InputWrapper>
);

export default TextInput;
