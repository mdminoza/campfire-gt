import React from 'react';
import { Container, Wrapper, ButtonStyle } from './elements';

type Props = {
  onClick?: () => void;
};

const RoomControls = ({ onClick = () => {} }: Props): React.ReactElement => (
  <Container>
    <Wrapper>
      <ButtonStyle onClick={onClick}>ADMIN MENU</ButtonStyle>
      <ButtonStyle>MUTE</ButtonStyle>
      <ButtonStyle>KICK</ButtonStyle>
      <ButtonStyle>ADD MODERATOR</ButtonStyle>
      <ButtonStyle>ADD SPEAKER</ButtonStyle>
    </Wrapper>
  </Container>
);

export default RoomControls;
