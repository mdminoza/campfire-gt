/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import ActiveTemplate from './ActiveTemplate';
// import { DUMMY_SPEAKERS } from '../../organisms/SpeakersArea/stories';

import { MemberItemParams } from '../../molecules/MemberItem/types';

export const DUMMY_MEMBERS: Array<MemberItemParams> = [
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Bill',
    onClick: () => {},
    isSpeaker: true,
    isActive: false,
    uid: 'AIttWfaBOjW4DAVcmgn',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Wallace',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: 'cNNYthSXi0H9',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'John',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: 'kQ65AUbj1KtBDQG3V',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Simon',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: '1GvP8P0W',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Matt',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: 'v8Dqlr',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Denver',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: '9MP6ORJwY29s',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Tokyo',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: 'LiJoPatTjxnBfUzvLE',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Rio',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: 'sODDvBF',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Berlin',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: 'jtpvRsNjoqdPm',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Helisinki',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: 'jaT2yCX7N5s8Z',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Moscow',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: 'OzjtYIVROrK8',
  },

  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Bill',
    onClick: () => {},
    isSpeaker: true,
    isActive: false,
    uid: 'AIttWfaBOjW4DAVcmg123n',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Wallace',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: 'cNNYthSX12ad3i0H9',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'John',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: 'kQ65AUbj1Kt234BDQG3V',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Simon',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: '1GvP8avxcvP0W',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Matt',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: 'v8Dqlaxvdfr',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Denver',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: '9MP6ORJwegbsdwY29s',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Tokyo',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: 'LiJoPatTjxsdfhnBfUzvLE',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Rio',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: 'sODDv234grfdvBF',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Berlin',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: 'jtpvRsNjosdfvqdPm',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Helisinki',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: 'jaT2yCXdsfvdr7N5s8Z',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Moscow',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: 'OzjtYIVsdfgs4ROrK8',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Berlin',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: 'jtpvRsNjosdfvqdPm',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Helisinki',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: 'jaT2yCXdsfvdr7N5s8Z',
  },
  {
    profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    onClickMenu: () => {},
    speaker: 'Moscow',
    onClick: () => {},
    isSpeaker: false,
    isActive: false,
    uid: 'OzjtYIVsdfgasdf1s4ROrK8',
  },
];

const Component = () => {
  const [selectedId, setSelectedId] = useState<string>('');

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
    <ActiveTemplate
    // selectedId={selectedId}
    // onClickMember={handleClickMember}
    // id="jKKOi8t"
    // speakers={[...DUMMY_SPEAKERS].splice(0, 2)}
    // members={[...DUMMY_MEMBERS].splice(0, 2)}
    // profileUrl="https://dummyimage.com/155x155/000/fff"
    // isSpeaker={false}
    // isRaising={false}
    // isTalking={false}
    // isMuted={false}
    // onClickRaiseHand={(id) => console.log(id)}
    // topic="Money in the bible"
    // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies vulputate vestibulum, sed tempus. Justo"
    />
  );
};

storiesOf('template/Active', module)
  .addDecorator((getStory) => <BrowserRouter>{getStory()}</BrowserRouter>)
  .add('default', () => <Component />);
