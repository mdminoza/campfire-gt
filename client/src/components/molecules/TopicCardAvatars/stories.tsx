import React from 'react';
import { storiesOf } from '@storybook/react';
import TopicCardAvatars from './TopicCardAvatars';

export const members = [
  {
    id: 'jRhOxJXnBZVhfCFK',
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
  },
  {
    id: 'VtsdhgJSLAL',
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
  },
  {
    id: 'aACbb8Pky7m3',
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
  },
  {
    id: '3dBz7SX5VTZEFu',
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
  },
  {
    id: 'TnBuAucK1DBHaN94dn',
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
  },
  {
    id: 'xUnqVVfs7D4',
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
  },
  {
    id: '48aTcmNsXCmSEyw7h',
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
  },
  {
    id: 'l9UjrwNRi4qFzGGr',
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
  },
  {
    id: 'yTGOA5HD08v1nBfRu',
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
  },
];

storiesOf('molecule/Topic Card Avatars', module).add('default', () => (
  <TopicCardAvatars avatarMembers={members} />
));
