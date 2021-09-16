import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { Modal } from '.';

const Children = styled.div`
  width: 100%;
  height: 100%;
  background-color: #eaeaea;
  border-radius: inherit;
`;

const ModalWrapper = styled.div`
  width: 400px;
  height: 300px;
  border-radius: 0px;
  background-color: rgba(255, 255, 255, 0);
`;

storiesOf('Atom/Modal', module)
  .addDecorator(withKnobs)
  .add('Default Modal with children component', () => (
    <ModalWrapper>
      <Modal isVisible={boolean('Is Visible', true)}>
        <Children />
      </Modal>
    </ModalWrapper>
  ));
