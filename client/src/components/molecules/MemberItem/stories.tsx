import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Row, Col } from 'antd';
import MemberItem from './MemberItem';

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

  return (
    <Row gutter={[16, 16]}>
      <Col>
        <MemberItem
          id="oEuVw5sSfDqWRFh"
          selectedId={selectedId}
          profileUrl="https://dummyimage.com/263x263/4a4a4a/ffffff"
          onClickMenu={(menu) => console.log(menu, 'selected')}
          speaker="Bill Wallace"
          onClick={handleClick}
          isSpeaker
          isActive
        />
      </Col>
      <Col>
        <MemberItem
          id="28sopbbV7a"
          selectedId={selectedId}
          profileUrl="https://dummyimage.com/263x263/4a4a4a/ffffff"
          onClickMenu={(menu) => console.log(menu, 'selected')}
          speaker="Jason Mcnight"
          onClick={handleClick}
          isSpeaker
          isActive={false}
          isModerator
        />
      </Col>
      <Col>
        <MemberItem
          id="n15U5nKnq"
          selectedId={selectedId}
          profileUrl="https://dummyimage.com/263x263/4a4a4a/ffffff"
          onClickMenu={(menu) => console.log(menu, 'selected')}
          speaker="T. Tanner"
          onClick={handleClick}
          isSpeaker={false}
          isActive={false}
          isRaising
        />
      </Col>
      <Col>
        <MemberItem
          id="6EDVgFsAIsXvzoKiEZc"
          selectedId={selectedId}
          profileUrl="https://dummyimage.com/263x263/4a4a4a/ffffff"
          onClickMenu={(menu) => console.log(menu, 'selected')}
          speaker="Michael Banes"
          onClick={handleClick}
          isSpeaker={false}
          isActive={false}
        />
      </Col>
      <Col>
        <MemberItem
          id="0wy9UXWpYDqg6RVG6Vc"
          selectedId={selectedId}
          profileUrl="https://dummyimage.com/263x263/4a4a4a/ffffff"
          onClickMenu={(menu) => console.log(menu, 'selected')}
          speaker="Buddy"
          onClick={handleClick}
          isSpeaker={false}
          isActive={false}
          isMuted
        />
      </Col>
    </Row>
  );
};

storiesOf('molecule/MemberItem', module)
  .addDecorator(withKnobs)
  .add('default', () => <Component />);
