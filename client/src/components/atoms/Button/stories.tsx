import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';
import { createCampireStyle, Container } from './elements';

const onPress = (): void => {};

storiesOf('atom/Button', module)
  .add('default button', () => (
    <Container>
      <Button onClick={onPress}>default</Button>
    </Container>
  ))
  .add('Create Campire', () => (
    <Button onClick={onPress} style={createCampireStyle}>
      Create Campire
    </Button>
  ));
