import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import CreateCampfire from './CreateCampfire';

storiesOf('molecule/CreateCampire', module).add('default', () => {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [checked, setChecked] = useState(false);

  const handleOnChangeCheckbox = () => setChecked(!checked);
  const [campfireToggled, setCampfireToggled] = useState<boolean>(false);
  const toggleCampfire = () => setCampfireToggled(!campfireToggled);

  return (
    <CreateCampfire
      onChangeTopic={setTopic}
      onChangeDescription={setDescription}
      topicValue={topic}
      descriptionValue={description}
      onPress={toggleCampfire}
      onPressSubmit={toggleCampfire}
      onChangeCheckbox={handleOnChangeCheckbox}
      checked={checked}
      toggled={campfireToggled}
      onChangeScheduleTostart={(value) => console.log(value)}
      onChangeOpenTo={(type, invited) => console.log(type, invited)}
      onChangeDuration={(duration) => console.log(duration)}
    />
  );
});
