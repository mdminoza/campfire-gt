import React from 'react';
import { StyledCheckbox, CheckboxContainer } from './elements';

type Props = {
  checked: boolean;
  onChange: () => void;
  children?: React.ReactNode;
};

const Checkbox = ({
  checked,
  onChange,
  children,
}: Props): React.ReactElement => (
  <CheckboxContainer>
    <StyledCheckbox checked={checked} onChange={onChange} />
    {children}
  </CheckboxContainer>
);

export default Checkbox;
