import React from 'react';
import { storiesOf } from '@storybook/react';
import DateTimePicker from './DateTimePicker';
import { StoryContainer } from './elements';

storiesOf('molecule/Date & Time Picker', module).add('default', () => (
  <StoryContainer>
    <DateTimePicker setSchedule={() => {}} breakpoints={['xs', 'sm', 'md']} />
  </StoryContainer>
));
