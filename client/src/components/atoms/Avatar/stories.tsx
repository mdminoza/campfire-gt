import React from 'react';
import { storiesOf } from '@storybook/react';
import Avatar from './Avatar';
import { AvatarIcon } from '../Icons';
import { Container } from './elements';

const AvatarSample = <AvatarIcon />;

storiesOf('atom/Avatar', module)
  .add('Default', () => (
    <Container>
      <Avatar src={AvatarSample} alt="Campfire" />
    </Container>
  ))
  .add('with Badge', () => (
    <Container>
      <Avatar src={AvatarSample} alt="Sample badge" badge="3" />
    </Container>
  ))
  .add('with Name', () => (
    <Container>
      <Avatar
        src={AvatarSample}
        alt="Sample with name"
        name="Tokyo"
        size={30}
      />
    </Container>
  ));
