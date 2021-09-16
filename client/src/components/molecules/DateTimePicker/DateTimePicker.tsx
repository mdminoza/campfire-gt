/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Container,
  OptionWrapper,
  MonthWrapper,
  TimeWrapper,
  TextStyle,
  TextWrapper,
  BtnStyle,
  Wrapper,
  TextStyle2,
} from './elements';
import { Button } from '../../atoms/Button';
import { getDays } from '../../../utils/helpers/date';
import { times, months } from '../../../utils/helpers/constants';
import { ScheduleTypes } from './types';

type Props = {
  // onSelect: () => void;
  setSchedule: (params: ScheduleTypes, isImmediately: boolean) => void;
  breakpoints: unknown[];
  toggle?: boolean;
};

const DateTimePicker = ({
  setSchedule,
  breakpoints,
  toggle = false,
}: Props): React.ReactElement => {
  const [month, setMonth] = useState(1);
  const [noOfDays, setNoOfDays] = useState([1]);
  const [day, setDay] = useState<number | undefined>(undefined);
  const [timeIndex, setTimeIndex] = useState<number | undefined>(undefined);
  const [time, setTime] = useState<string>();
  const [isImmediate, setImmediate] = useState(true);

  const handleImmidiately = () => {
    setImmediate(true);
  };

  useEffect(() => setNoOfDays(getDays(month)), [month]);

  useEffect(() => {
    if (month === 0) {
      handleImmidiately();
    }
    console.log('Schedule: ', month, day, time); // for testing purposes only
  }, [month, day, time]);

  const handleSetMonth = (index: number) => {
    if (index === 0) {
      handleImmidiately();
    } else {
      setMonth(index);
      setDay(undefined);
      setTime('');
      setTimeIndex(undefined);
      setImmediate(false);
    }
  };

  const handleSetDay = (num: number) => {
    setDay(num);
    setImmediate(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSetTime = (index: any) => {
    setTimeIndex(index);
    const formattedTime = moment().hours(index).format('HH:00');
    setTime(formattedTime);
    setImmediate(false);
  };

  const handleSchedule = () => {
    setSchedule({ month, day, time }, isImmediate);
  };

  const RenderTime = () => (
    <OptionWrapper>
      {times.map((val, index) => (
        <TimeWrapper onClick={() => handleSetTime(index)}>
          <TextStyle isSelected={timeIndex === index && !isImmediate}>
            {val}
          </TextStyle>
          <TextStyle isSelected={timeIndex === index && !isImmediate}>
            {index < 12 ? 'am' : 'pm'}
          </TextStyle>
        </TimeWrapper>
      ))}
    </OptionWrapper>
  );

  useEffect(() => {
    if (!toggle) {
      handleImmidiately();
    }
  }, [toggle]);

  return (
    <Container isSmallScreen={breakpoints?.length < 2}>
      <Wrapper>
        <MonthWrapper>
          {/* <TextWrapper onClick={() => handleSetMonth(0)}>
            <TextStyle2 isSelected={isImmediate}>IMMEDIATELY</TextStyle2>
          </TextWrapper> */}
          {months.map((name, index) => (
            <TextWrapper onClick={() => handleSetMonth(index)}>
              {index === 0 ? (
                <TextStyle2 isSelected={isImmediate}>IMMEDIATELY</TextStyle2>
              ) : (
                <TextStyle isSelected={month === index && !isImmediate}>
                  {name}
                </TextStyle>
              )}
            </TextWrapper>
          ))}
        </MonthWrapper>
        <OptionWrapper>
          {noOfDays &&
            noOfDays.map((num) => (
              <TextWrapper onClick={() => handleSetDay(num)}>
                <TextStyle isSelected={day === num && !isImmediate}>
                  {num}
                </TextStyle>
              </TextWrapper>
            ))}
        </OptionWrapper>
        {RenderTime()}
      </Wrapper>
      <Button onClick={() => handleSchedule()} style={BtnStyle}>
        CHOOSE THIS TIME
      </Button>
    </Container>
  );
};

export default DateTimePicker;
