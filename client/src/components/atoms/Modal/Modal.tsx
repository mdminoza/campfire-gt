import React from 'react';
import { Container } from './elements';

type Props = {
  isVisible?: boolean;
  children?: React.ReactElement | null;
};

const Modal = ({
  isVisible = false,
  children = null,
}: Props): React.ReactElement => (
  <Container isVisible={isVisible}>{children}</Container>
);

export default Modal;
