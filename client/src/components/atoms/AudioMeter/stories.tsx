import React from 'react';
import { storiesOf } from '@storybook/react';
import AudioMeter from './AudioMeter';

storiesOf('atom/AudioMeter', module).add('default', () => (
  <AudioMeter level={100} />
));
