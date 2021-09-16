import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import styled from 'styled-components';

import CampfireFooter from './CampfireFooter';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: gray;
`;

storiesOf('organism/CampfireFooter', module)
  .addDecorator((getStory) => <BrowserRouter>{getStory()}</BrowserRouter>)
  .add('default', () => (
    <Layout>
      <Container />
      <CampfireFooter
        id="nD01aeTmtBdNxnDdDO4"
        profileUrl="https://dummyimage.com/155x155/000/fff"
        isRaising={false}
        onClickRaiseHand={(id, isRaising) => console.log(id, isRaising)}
      />
    </Layout>
  ))
  .add('hand is raised', () => (
    <Layout>
      <Container />
      <CampfireFooter
        id="nD01aeTmtBdNxnDdDO4"
        profileUrl="https://dummyimage.com/155x155/000/fff"
        isRaising
        onClickRaiseHand={(id, isRaising) => console.log(id, isRaising)}
      />
    </Layout>
  ))
  .add('speaker and speaking', () => (
    <Layout>
      <Container />
      <CampfireFooter
        id="nD01aeTmtBdNxnDdDO4"
        profileUrl="https://dummyimage.com/155x155/000/fff"
        isSpeaker
        isTalking
        onClickRaiseHand={(id, isRaising) => console.log(id, isRaising)}
      />
    </Layout>
  ))
  .add('speaker and not speaking', () => (
    <Layout>
      <Container />
      <CampfireFooter
        id="nD01aeTmtBdNxnDdDO4"
        profileUrl="https://dummyimage.com/155x155/000/fff"
        isSpeaker
        onClickRaiseHand={(id, isRaising) => console.log(id, isRaising)}
      />
    </Layout>
  ))
  .add('speaker and muted', () => (
    <Layout>
      <Container />
      <CampfireFooter
        id="nD01aeTmtBdNxnDdDO4"
        profileUrl="https://dummyimage.com/155x155/000/fff"
        isSpeaker
        isMuted
        onClickRaiseHand={(id, isRaising) => console.log(id, isRaising)}
      />
    </Layout>
  ));
