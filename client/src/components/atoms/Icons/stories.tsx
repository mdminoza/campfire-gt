import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import AppLogo from './AppLogo';
import FireOutline from './FireOutline';
import EmojiWink from './EmojiWink';
import EmojiSmiley from './EmojiSmiley';
import EmojiSweat from './EmojiSweat';
import EmojiCool from './EmojiCool';
import RaiseHand from './RaiseHand';
import Audio from './Audio';
import AvatarIcon from './AvatarIcon';
import Search from './Search';
import SpeakerStatus from './SpeakerStatus';
import SpeakerActiveStatus from './SpeakerActiveStatus';
import MenuOutlined from './MenuOutlined';
import Close from './Close';
import Refresh from './Refresh';
import Mic from './Mic';
import MicOff from './MicOff';
import KeyboardVoice from './KeyboardVoice';
import Asterisks from './Asterisks';
import BlackCrown from './BlackCrown';
import Settings from './Settings';

import { theme } from '../../../constants';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${theme.colors.blue.primary};
`;

storiesOf('atom/Icons', module)
  .add('AppLogo', () => <AppLogo />)
  .add('FireOutline', () => (
    <Container>
      <FireOutline />
    </Container>
  ))
  .add('EmojiWink', () => <EmojiWink />)
  .add('EmojiSmiley', () => <EmojiSmiley />)
  .add('EmojiSweat', () => <EmojiSweat />)
  .add('EmojiCool', () => <EmojiCool />)
  .add('RaiseHand', () => (
    <Container>
      <RaiseHand />
    </Container>
  ))
  .add('Audio', () => <Audio />)
  .add('AvatarIcon', () => <AvatarIcon />)
  .add('Search', () => <Search />)
  .add('SpeakerStatus', () => <SpeakerStatus />)
  .add('SpeakerActiveStatus', () => <SpeakerActiveStatus />)
  .add('MenuOutlined', () => <MenuOutlined />)
  .add('Close', () => <Close />)
  .add('Refresh', () => <Refresh />)
  .add('Mic', () => <Mic />)
  .add('Mic_off', () => <MicOff />)
  .add('Keyboard_voice', () => <KeyboardVoice />)
  .add('Asterisks', () => <Asterisks />)
  .add('BlackCrown', () => <BlackCrown />)
  .add('Settings', () => <Settings />);
