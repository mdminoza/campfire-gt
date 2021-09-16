import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';

import CampfireHeader from './CampfireHeader';

const links = [
  {
    label: 'HOME',
    onClick: () => {},
    link: '',
    active: false,
  },
  {
    label: 'WATCH',
    onClick: () => {},
    link: '',
    active: false,
  },
  {
    label: 'CAMPFIRES',
    onClick: () => {},
    link: '',
    active: true,
  },
  {
    label: 'GROUPS',
    onClick: () => {},
    link: '',
    active: false,
  },
  {
    label: 'DISCUSSION',
    onClick: () => {},
    link: '',
    active: false,
  },
];

storiesOf('organism/CampfireHeader', module)
  .addDecorator((getStory) => <BrowserRouter>{getStory()}</BrowserRouter>)
  .add('default', () => (
    <Layout>
      <CampfireHeader
        avatarUrl="https://dummyimage.com/200x200/2b6470/fff"
        headerMessage="WELCOME"
        items={links}
      />
    </Layout>
  ))
  .add('On Topic', () => (
    <Layout>
      <CampfireHeader
        avatarUrl="https://dummyimage.com/200x200/2b6470/fff"
        headerMessage="MONEY IN THE BIBLE"
        isOnTopic
        items={links}
      />
    </Layout>
  ));
