import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import CreateCampfireForm from './CreateCampfireForm';

const Component = () => {
  const [isToggled, setCampfireToggled] = useState<boolean>(false);
  const handleToggle = () => setCampfireToggled(!isToggled);
  return (
    <CreateCampfireForm
      toggle={isToggled}
      onPress={handleToggle}
      onSubmit={(values) => console.log(values)}
    />
  );
};

storiesOf('organism/CreateCampfireForm', module).add('default', () => (
  <Component />
));
