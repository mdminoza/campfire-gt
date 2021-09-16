import React, { useState, useEffect } from 'react';
// import React from 'react';
import {
  Container,
  TimeContainer,
  TextStyle,
  TimeWrapper,
  BtnStyle,
  TextWrapper,
} from './elements';
import { Button } from '../../atoms/Button';
// import { TimePicker } from 'antd';
import { hours, minutes } from '../../../utils/helpers/constants';

type Props = {
  setDuration: (hour: string, min: string) => void;
  toggle?: boolean;
};

const TimeDurationPicker = ({
  setDuration,
  toggle = false,
}: Props): React.ReactElement => {
  const [hour, setHour] = useState('01');
  const [minute, setMinute] = useState('00');

  const handleSetHour = (val: string) => {
    setHour(val);
  };

  const handleSetMinutes = (val: string) => {
    setMinute(val);
  };

  const handleSetSelect = () => {
    setDuration(hour, minute);
  };

  const RenderHour = () => (
    <TimeContainer>
      {hours.map((val) => (
        <TextWrapper onClick={() => handleSetHour(val)}>
          <TextStyle isSelected={val === hour}>{val}</TextStyle>
        </TextWrapper>
      ))}
    </TimeContainer>
  );

  const RenderMinutes = () => (
    <TimeContainer>
      {minutes.map((val) => (
        <TextWrapper onClick={() => handleSetMinutes(val)}>
          <TextStyle isSelected={val === minute}>{val}</TextStyle>
        </TextWrapper>
      ))}
    </TimeContainer>
  );

  useEffect(() => {
    if (!toggle) {
      setHour('01');
      setMinute('00');
    }
  }, [toggle]);

  return (
    <Container>
      <TimeWrapper>
        {RenderHour()}
        {RenderMinutes()}
        {/* <TimePicker format={'HH:mm'} /> */}
      </TimeWrapper>
      <Button onClick={() => handleSetSelect()} style={BtnStyle}>
        SELECT
      </Button>
    </Container>
  );
};

export default TimeDurationPicker;
