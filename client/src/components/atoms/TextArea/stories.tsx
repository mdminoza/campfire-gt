import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import TextArea from './TextArea';
import { Container } from './elements';

const onChange = (): void => {};

storiesOf('atom/TextArea', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Container>
      <TextArea
        value={text('value', '')}
        onChange={onChange}
        placeholder="default textarea"
      />
    </Container>
  ))
  .add('defined Rows', () => (
    <Container>
      <TextArea
        value={text('value', '')}
        onChange={onChange}
        placeholder="minRows: 3, maxRows: 5"
        minRow={3}
        maxRow={5}
      />
    </Container>
  ));
