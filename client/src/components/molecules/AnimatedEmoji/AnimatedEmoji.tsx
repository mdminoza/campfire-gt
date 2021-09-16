import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import animateEmoji from '../../../lib/animate-emoji';

import {
  EmojiCool,
  EmojiSmiley,
  EmojiSweat,
  EmojiWink,
} from '../../atoms/Icons';

const Container = styled.div`
  position: absolute;
  z-index: 1;
  padding: 0;
  display: flex;
  width: ${(props: { isAudience?: boolean }) =>
    props?.isAudience ? 60 : 80}px;
  height: ${(props: { isAudience?: boolean }) =>
    props?.isAudience ? 60 : 80}px;
  top: 30px;
  left: 10px;
`;

type Props = {
  emoji: string;
  emojiId: string;
  isAudience?: boolean;
};

const AnimatedEmoji = ({
  emoji,
  emojiId,
  isAudience = false,
}: Props): React.ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let divRef: any;
  const [element, setElement] = useState(null);
  useEffect(() => {
    if (element) animateEmoji(element);
  }, [element]);
  let activeEmoji = <></>;

  const iconDimension = isAudience ? 60 : 80;

  // eslint-disable-next-line prefer-const
  divRef = setElement;

  switch (emoji) {
    case 'cool': {
      activeEmoji = <EmojiCool width={iconDimension} height={iconDimension} />;
      break;
    }
    case 'smile': {
      activeEmoji = (
        <EmojiSmiley width={iconDimension} height={iconDimension} />
      );
      break;
    }
    case 'sweat': {
      activeEmoji = <EmojiSweat width={iconDimension} height={iconDimension} />;
      break;
    }
    case 'wink': {
      activeEmoji = <EmojiWink width={iconDimension} height={iconDimension} />;
      break;
    }
    default: {
      activeEmoji = <></>;
    }
  }

  return (
    <Container isAudience={isAudience} key={emojiId} ref={divRef}>
      {activeEmoji}
    </Container>
  );
};

export default AnimatedEmoji;
