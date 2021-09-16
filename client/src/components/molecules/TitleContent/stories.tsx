import React from 'react';
import { storiesOf } from '@storybook/react';

import TitleContent from './TitleContent';

storiesOf('molecule/TitleContent', module)
  .add('default', () => <TitleContent />)
  .add('on active page', () => (
    <TitleContent
      onActive
      title="MONEY IN THE BIBLE"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies vulputate vestibulum, sed tempus. Justo "
    />
  ));
