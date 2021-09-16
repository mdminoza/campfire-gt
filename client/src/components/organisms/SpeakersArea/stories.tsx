/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import SpeakersArea from './SpeakersArea';
import { Container } from './elements';
import { MemberItemParams } from '../../molecules/MemberItem/types';

export const DUMMY_SPEAKERS: Array<MemberItemParams> = [
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    // onClickMenu: {(menu) => console.log(menu, 'selected')},
    onClickMenu: () => {},
    speaker: 'Bill',
    onClick: () => {},
    isSpeaker: true,
    isActive: true,
    uid: 'AIttWfaBOjW4DAVcmgn',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Wallace',
    onClick: () => {},
    isSpeaker: true,
    isActive: true,
    uid: 'cNNYthSXi0H9',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'John',
    onClick: () => {},
    isSpeaker: true,
    isActive: true,
    uid: 'kQ65AUbj1KtBDQG3V',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Simon',
    onClick: () => {},
    isSpeaker: true,
    isActive: true,
    uid: '1GvP8P0W',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Matt',
    onClick: () => {},
    isSpeaker: true,
    isActive: true,
    uid: 'v8Dqlr',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Joseph',
    onClick: () => {},
    isSpeaker: true,
    isActive: true,
    uid: '9MP6ORJwY29s',
  },
];

const Component = ({
  data,
  invites,
}: {
  data: Array<MemberItemParams>;
  invites?: Array<MemberItemParams>;
}) => {
  const [selectedId, setSelectedId] = useState<string>('');

  const handleClick = (id: string) => setSelectedId(id);

  useEffect(() => {
    const onClickEvent = (e: any) => {
      if (e.target && e.target.id !== '_memberCard') {
        setSelectedId('');
      }
    };
    if (selectedId) {
      window.addEventListener('click', onClickEvent);
    }
  }, [selectedId]);

  return (
    <Container>
      <SpeakersArea
        data={data}
        onClick={handleClick}
        selectedId={selectedId}
        invites={invites}
      />
    </Container>
  );
};

storiesOf('Organism/Speakers Area', module)
  .add('default', () => {
    const speakers = [...DUMMY_SPEAKERS];
    return <Component data={speakers.splice(0, 3)} />;
  })
  .add('Many Speakers', () => {
    const speakers = [...DUMMY_SPEAKERS];
    return <Component data={speakers} />;
  })
  .add('With Invites', () => {
    const speakers = [...DUMMY_SPEAKERS];
    return <Component data={speakers.splice(0, 4)} invites={speakers} />;
  });
