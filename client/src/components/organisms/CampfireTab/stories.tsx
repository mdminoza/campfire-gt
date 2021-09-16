import React from 'react';
import { storiesOf } from '@storybook/react';
import { Layout } from 'antd';

import CampfireTab from './CampfireTab';

const tabs = [
  {
    key: 'Pk4YrY5yv3aktWx',
    title: 'Public Campfires',
    count: 15,
    children:
      'Magna reprehenderit velit anim deserunt pariatur do dolor dolore anim exercitation.',
  },
  {
    key: '3xnCAstox',
    title: 'Private Group Campfires',
    count: 10,
    children: 'Nulla id duis elit irure duis id deserunt aliquip deserunt.',
  },
  {
    key: 'R3vHfIFx5c8',
    title: 'My Own Campfires',
    count: 1,
    children: 'Qui minim excepteur enim commodo culpa.',
  },
];

storiesOf('organism/CampfireTab', module).add('default', () => (
  <Layout>
    <CampfireTab tabs={tabs} onChange={() => {}} />
  </Layout>
));
