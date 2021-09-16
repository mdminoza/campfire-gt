import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Checkbox from './Checkbox';
import { Wrapper } from './elements';

storiesOf('atom/Checkbox', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <Wrapper>
      {/* <CheckboxContainer> */}
      <Checkbox checked={boolean('checked', true)} onChange={() => {}} />
      {/* </CheckboxContainer> */}
    </Wrapper>
  ))
  .add('with Text', () => (
    <Wrapper>
      {/* <CheckboxContainer> */}
      <Checkbox checked={boolean('checked', false)} onChange={() => {}} />
      {/* </CheckboxContainer> */}
    </Wrapper>
  ));
