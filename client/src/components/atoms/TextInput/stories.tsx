import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import TextInput from './TextInput';
import { AvatarIcon } from '../Icons';
import { Avatar } from '../Avatar';
import { Container, Wrapper } from './elements';

const profile = <Avatar src={<AvatarIcon />} alt="sample" />;

storiesOf('atom/TextInput', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const [value, setValue] = useState('');
    return (
      <Container>
        <Wrapper>
          <TextInput
            onChange={setValue}
            placeholder={text('Placeholder', 'Enter here...')}
            value={value}
          />
        </Wrapper>
      </Container>
    );
  })
  .add('with Avatar', () => {
    const [value, setValue] = useState('');
    return (
      <Container>
        <Wrapper>
          <TextInput
            onChange={setValue}
            placeholder={text('Placeholder', 'CREATE TOPIC')}
            addonBefore={profile}
            size="large"
            value={value}
          />
        </Wrapper>
      </Container>
    );
  });
