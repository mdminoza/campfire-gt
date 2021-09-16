import React, { useEffect } from 'react';
import { AudioProgress, Bar } from './elements';

type Props = {
  level: number;
};

const AudioMeter = ({ level }: Props): React.ReactElement => {
  useEffect(() => {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < bars.length; i++) {
      if (level / (100 / bars.length) > i) {
        bars[i].classList.add('on');
      } else {
        bars[i].classList.remove('on');
      }
    }
  }, [level]);
  return (
    <AudioProgress>
      <Bar className="bar" />
      <Bar className="bar" />
      <Bar className="bar" />
      <Bar className="bar" />
      <Bar className="bar" />
    </AudioProgress>
  );
};

export default AudioMeter;
