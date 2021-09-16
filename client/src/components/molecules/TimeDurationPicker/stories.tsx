import React from 'react';
import { storiesOf } from '@storybook/react';
import TimeDurationPicker from './TimeDurationPicker';

storiesOf('molecule/Time Duration Picker', module).add('default', () => (
  <TimeDurationPicker setDuration={() => {}} />
));
