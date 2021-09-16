import React from 'react';
import { storiesOf } from '@storybook/react';
import InviteTags from './InviteTags';
import { StoryContainer } from './elements';

storiesOf('molecule/Invite Tag', module).add('Default', () => (
  <StoryContainer>
    <InviteTags setInvite={() => {}} />
  </StoryContainer>
));
