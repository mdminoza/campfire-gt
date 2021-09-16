import React from 'react';
import { storiesOf } from '@storybook/react';
import { Col } from 'antd';

import TopicCard from './TopicCard';
import { Container } from './elements';

const profileURL = 'https://dummyimage.com/200x200/000/fff';
const desc =
  'Lorem Ipsum DolorSunt pariatur id duis sunt deserunt. Irure Lorem nulla non consequat culpa labore magna adipisicing et occaecat enim. Excepteur Lorem minim cillum amet do amet duis elit enim et ullamco proident irure ullamco.Officia aliqua commodo aliquip nostrud esse ex dolor commodo consequat velit. In amet ullamco voluptate magna pariatur tempor ex occaecat ullamco dolor in. Fugiat ipsum dolore cupidatat excepteur sit nulla proident mollit minim occaecat. Lorem eiusmod ex non officia. Eu anim est aute aliquip ipsum veniam aliqua labore fugiat anim mollit ea veniam. Incididunt ad pariatur magna occaecat est ut occaecat culpa duis magna ullamco duis. Commodo cupidatat veniam culpa fugiat proident esse veniam mollit quis reprehenderit sit ex non et.';
storiesOf('Organism/Topic Card', module)
  .add('Featured & Invited', () => (
    <Container>
      <Col span={6}>
        <TopicCard
          profileURL={profileURL}
          title="Biking For Jesus"
          desc={desc}
          date={new Date('4/12/2021')}
          isStarted
          isFeatured
          status="invited"
          onClick={() => {}}
        />
      </Col>
    </Container>
  ))
  .add('Featured & Uninvited', () => (
    <Container>
      <Col span={6}>
        <TopicCard
          profileURL={profileURL}
          title="Biking For Jesus"
          desc={desc}
          date={new Date('4/12/2021')}
          isStarted
          isFeatured
          status=""
          onClick={() => {}}
        />
      </Col>
    </Container>
  ))
  .add('Started & Invited', () => (
    <Container>
      <Col span={4}>
        <TopicCard
          profileURL={profileURL}
          title="Biking For Jesus"
          desc={desc}
          date={new Date('4/12/2021')}
          isStarted
          isFeatured={false}
          status="invited"
          onClick={() => {}}
        />
      </Col>
    </Container>
  ))
  .add('not yet Invited', () => (
    <Container>
      <Col span={4}>
        <TopicCard
          profileURL={profileURL}
          title="Biking For Jesus"
          desc={desc}
          date={new Date('4/11/2021')}
          isStarted
          isFeatured={false}
          status=""
          onClick={() => {}}
        />
      </Col>
    </Container>
  ))
  .add('Upcomming', () => (
    <Container>
      <Col span={4}>
        <TopicCard
          profileURL={profileURL}
          title="Biking For Jesus"
          desc={desc}
          date={new Date('4/21/2021')}
          isStarted={false}
          isFeatured={false}
          status=""
          onClick={() => {}}
        />
      </Col>
    </Container>
  ));
