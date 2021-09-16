import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import MembersList from './MembersList';
import { MemberItemParams } from '../../molecules/MemberItem/types';

const Component = () => {
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

  const data: MemberItemParams[] = [
    {
      uid: 'A4rbx0yLmly',
      profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
      onClickMenu: handleClick,
      speaker: 'Bill Wallace',
      onClick: handleClick,
      isSpeaker: false,
      isActive: true,
    },
    {
      uid: 'oEuVw51sSfDqWRFh',
      profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
      onClickMenu: handleClick,
      speaker: 'Bill Wallace',
      onClick: handleClick,
      isSpeaker: false,
      isActive: true,
    },
    // {
    //   id: 'qSMArhsbo7H3X',
    //   profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    //   onClickMenu: handleClick,
    //   speaker: 'Bill Wallace',
    //   onClick: handleClick,
    //   isSpeaker: false,
    //   isActive: true,
    // },
    // {
    //   id: 'LYLmY',
    //   profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    //   onClickMenu: handleClick,
    //   speaker: 'Bill Wallace',
    //   onClick: handleClick,
    //   isSpeaker: false,
    //   isActive: true,
    // },
    // {
    //   id: 'WuAd2Irx',
    //   profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    //   onClickMenu: handleClick,
    //   speaker: 'Bill Wallace',
    //   onClick: handleClick,
    //   isSpeaker: false,
    //   isActive: true,
    // },
    // {
    //   id: 'o4o0hEDjKrRKnMkJv5',
    //   profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    //   onClickMenu: handleClick,
    //   speaker: 'Bill Wallace',
    //   onClick: handleClick,
    //   isSpeaker: false,
    //   isActive: true,
    // },
    // {
    //   id: 'IeK6YLiHGU7SQe3NF6',
    //   profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    //   onClickMenu: handleClick,
    //   speaker: 'Bill Wallace',
    //   onClick: handleClick,
    //   isSpeaker: false,
    //   isActive: true,
    // },
    // {
    //   id: 'VTZgebgmBww5nWMYHptQe3NF6',
    //   profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    //   onClickMenu: handleClick,
    //   speaker: 'Mark Dave',
    //   onClick: handleClick,
    //   isSpeaker: false,
    //   isActive: false,
    //   isRaising: true,
    // },
    // {
    //   id: 'GlqnofzS4KVQQe3NF6',
    //   profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    //   onClickMenu: handleClick,
    //   speaker: 'Bill Wallace',
    //   onClick: handleClick,
    //   isSpeaker: false,
    //   isActive: true,
    // },
    // {
    //   id: 'D04D9YQe3NF6',
    //   profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    //   onClickMenu: handleClick,
    //   speaker: 'Bill Wallace',
    //   onClick: handleClick,
    //   isSpeaker: false,
    //   isActive: true,
    // },
    // {
    //   id: 'RfdWrRcTlGcwGjXAwQe3NF6',
    //   profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    //   onClickMenu: handleClick,
    //   speaker: 'Bill Wallace',
    //   onClick: handleClick,
    //   isSpeaker: false,
    //   isActive: true,
    // },
    // {
    //   id: 'g4R9Ph6AsOGjiFsjERQe3NF6',
    //   profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    //   onClickMenu: handleClick,
    //   speaker: 'Bill Wallace',
    //   onClick: handleClick,
    //   isSpeaker: false,
    //   isActive: true,
    // },
    // {
    //   id: 'WydBLJBq8rJOziZQe3NF6',
    //   profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    //   onClickMenu: handleClick,
    //   speaker: 'Bill Wallace',
    //   onClick: handleClick,
    //   isSpeaker: false,
    //   isActive: true,
    // },
    // {
    //   id: '0RYfAlUlvQe3NF6',
    //   profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    //   onClickMenu: handleClick,
    //   speaker: 'Bill Wallace',
    //   onClick: handleClick,
    //   isSpeaker: false,
    //   isActive: true,
    // },
    // {
    //   id: 'xEKMULCC0AtQe3NF6',
    //   profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    //   onClickMenu: handleClick,
    //   speaker: 'Bill Wallace',
    //   onClick: handleClick,
    //   isSpeaker: false,
    //   isActive: true,
    // },
    // {
    //   id: '9Xflox6L0KCNwLQe3NF6',
    //   profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    //   onClickMenu: handleClick,
    //   speaker: 'Bill Wallace',
    //   onClick: handleClick,
    //   isSpeaker: false,
    //   isActive: true,
    // },
    // {
    //   id: 'NmtmgFLOtnqP7puZRiQe3NF6',
    //   profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    //   onClickMenu: handleClick,
    //   speaker: 'Bill Wallace',
    //   onClick: handleClick,
    //   isSpeaker: false,
    //   isActive: true,
    // },
    // {
    //   id: 'cjtDF2dQe3NF6',
    //   profileUrl: 'https://dummyimage.com/263x263/4a4a4a/ffffff',
    //   onClickMenu: handleClick,
    //   speaker: 'Bill Wallace',
    //   onClick: handleClick,
    //   isSpeaker: false,
    //   isActive: true,
    // },
  ];

  return (
    <MembersList selectedId={selectedId} onClick={handleClick} data={data} />
  );
};

storiesOf('Organism/Members List', module).add('default', () => <Component />);
