import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Row, Col } from 'antd';
import InviteMemberItem from './InviteMemberItem';

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
        <InviteMemberItem
          name="Davess"
          url="https://i.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY"
          onClick={handleClick}
          onClickMenu={(key) => console.log(key, 'menu item')}
          selectedId={selectedId}
          id="aEQ7gAVSDDmvGG"
        />
      </Col>
      <Col>
        <InviteMemberItem
          name="Save"
          url="https://i.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY"
          onClick={handleClick}
          onClickMenu={(key) => console.log(key, 'menu item')}
          selectedId={selectedId}
          id="4iPtKDzcDB"
        />
      </Col>
    </Row>
  );
};

storiesOf('molecule/InviteMemberItem', module)
  .addDecorator(withKnobs)
  .add('default', () => <Component />);
