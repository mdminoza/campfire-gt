import React from 'react';
import { StyledTextArea } from './elements';

type Props = {
  value: string;
  onChange: () => void;
  placeholder?: string;
  minRow?: number;
  maxRow?: number;
};

const TextArea = ({
  value,
  onChange,
  placeholder,
  minRow,
  maxRow,
}: Props): React.ReactElement => (
  <>
    <StyledTextArea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoSize={{
        minRows: minRow,
        maxRows: maxRow,
      }}
    />
  </>
);

export default TextArea;
