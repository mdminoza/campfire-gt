import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid /* Spin */ } from 'antd';
// import { timeDiff } from '../../../utils/helpers/common';
// import { LoadingOutlined } from '@ant-design/icons';

import moment from 'moment';
import { FireOutline } from '../../atoms/Icons';
// import { Button } from '../../atoms/Button';

import { theme } from '../../../constants';
import { campfireBackground } from '../../../assets';

const { useBreakpoint } = Grid;

type Props = {
  title?: string;
  description?: string;
  onActive?: boolean;
  isDurationLoading?: boolean;
  duration?: string;
  onClickStartDuration?: (campfireId: string) => void;
  campfireId?: string;
  durationStartDate?: Date | undefined;
  isCreator?: boolean;
  scheduleToStart?: Date | undefined;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
  flex-direction: column;
  background: url(${campfireBackground});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  text-align: center;
  position: relative;
  @media (max-width: 768px) {
    height: 400px;
  }
  @media (max-width: 576px) {
    height: 300px;
  }
`;

export const Title = styled.span`
  font-family: ${theme.fonts.fontFamily};
  font-style: normal;
  font-weight: bold;
  font-size: ${(props: { fontSize?: string }) => props?.fontSize || '2rem'};
  letter-spacing: 0.32em;
  color: ${theme.colors.mainWhite};
  line-height: ${(props: { fontSize?: string; lineHeight?: string }) =>
    props?.lineHeight || '45px'};
  padding: ${(props: {
    lineHeight?: string;
    fontSize?: string;
    padding?: string | number;
  }) => props?.padding || 0};
  z-index: 1;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  @media (max-width: 576px) {
    font-size: 1.2rem;
  }
`;

export const Description = styled.p`
  font-family: ${theme.fonts.fontFamily};
  font-style: normal;
  font-size: ${(props: { width?: string; fontSize?: string }) =>
    props?.fontSize || '1rem'};
  letter-spacing: 0.32em;
  color: ${theme.colors.mainWhite};
  text-align: center;
  width: ${(props: { width?: string; fontSize?: string }) =>
    props?.width || '60%'};
  z-index: 1;
  padding: ${(props: {
    width?: string;
    fontSize?: string;
    padding?: string | number;
  }) => props?.padding || 0};
`;

const StartedTime = styled.span`
  font-family: ${theme.fonts.fontFamily};
  font-style: normal;
  font-size: ${(props: { width?: string; fontSize?: string }) =>
    props?.fontSize || '1rem'};
  letter-spacing: 0.32em;
  color: ${theme.colors.mainWhite};
  text-align: center;
  z-index: 1;
  padding-top: 32px;
`;

const IconWrapper = styled.div`
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${theme.colors.mainBlack};
  opacity: 0.6;
  height: 500px;
  @media (max-width: 768px) {
    height: 400px;
  }
  @media (max-width: 576px) {
    height: 300px;
  }
`;

const EditWrapper = styled.div`
  width: 100%;
  z-index: 1;
  position: absolute;
  bottom: 72px;
`;

const EditButton = styled.div`
  float: right;
  margin-right: 40px;
  width: 130px;
  border: 1px solid ${theme.colors.mainWhite};
  font-family: ${theme.fonts.fontFamily};
  font-style: normal;
  font-size: 14px;
  color: ${theme.colors.mainWhite};
  text-align: center;
  z-index: 1;
`;

// const DurationWrapper = styled.div`
//   z-index: 1;
//   margin-bottom: 10px;
// `;

// const StartedDuration = styled.span`
//   font-family: ${theme.fonts.fontFamily};
//   font-style: normal;
//   line-height: 30px;
//   letter-spacing: 0.02em;
//   color: ${theme.colors.mainWhite};
//   font-size: ${(props: { width?: string; fontSize?: string }) =>
//     props?.fontSize || '1.5rem'};
// `;

// const TotalDuration = styled.span`
//   font-family: ${theme.fonts.fontFamily};
//   font-style: normal;
//   font-weight: bold;
//   line-height: 30px;
//   letter-spacing: 0.02em;
//   color: ${theme.colors.mainWhite};
//   font-size: ${(props: { width?: string; fontSize?: string }) =>
//     props?.fontSize || '1.5rem'};
// `;

const TitleContent = ({
  title = 'CAMPFIRES',
  description = 'AUDIO ONLY MEETING ROOMS',
  onActive,
  scheduleToStart,
}: // onClickStartDuration = () => {},
// isDurationLoading = false,
// duration = '',
// campfireId = '',
// durationStartDate = undefined,
// isCreator = false,
Props): React.ReactElement => {
  // const [currentTime, setCurrentTime] = useState(0);
  // const [durationFrame, setDurationFrame] = useState('00:00');
  const screens = useBreakpoint();
  const { md, sm } = screens;
  const [elapseTime, setElapseTime] = useState<string>('');

  const iconDimension = onActive
    ? {
        width: !md ? 40 : 50,
        height: !md ? 71 : 81,
      }
    : {
        width: !sm ? 40 : 75,
        height: !sm ? 71 : 106,
        // width: 75,
        // height: 106,
      };

  useEffect(() => {
    if (scheduleToStart) {
      setElapseTime(
        `STARTED ${moment(
          moment(scheduleToStart).format('YYYYMMDD HH:mm:ss'),
          'YYYYMMDD HH:mm:ss',
        )
          .fromNow()
          .toString()
          .toUpperCase()}`,
      );
    }
  }, [scheduleToStart]);

  // const durationButtonStyle = {
  //   borderRadius: 5,
  //   backgroundColor: themes.colors.mainWhite,
  //   marginTop: 8,
  //   marginBottom: 8,
  //   width: 'auto',
  //   height: 'auto',
  // };

  // const loadingStyle = {
  //   color: 'white',
  //   fontSize: 20,
  // };

  // useEffect(() => {
  //   if (durationStartDate && onActive) {
  //     const curr = new Date();
  //     const currTime = curr.getTime();
  //     const timeoutId = setTimeout(() => {
  //       setCurrentTime(currTime);
  //     }, 800);

  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [currentTime, onActive, durationStartDate]);

  // useEffect(() => {
  //   if (durationStartDate) {
  //     const zeroPad = (num, places) => String(num).padStart(places, '0');
  //     let diff = currentTime - durationStartDate?.getTime();
  //     var msec = diff;
  //     var hh = Math.floor(msec / 1000 / 60 / 60);
  //     msec -= hh * 1000 * 60 * 60;
  //     var mm = Math.floor(msec / 1000 / 60);
  //     msec -= mm * 1000 * 60;
  //     var ss = Math.floor(msec / 1000);
  //     msec -= ss * 1000;
  //     const hours = hh <= 0 ? '00' : hh > 9 ? hh : zeroPad(hh, 2);
  //     setDurationFrame(`${hours}:${mm > 9 ? mm : zeroPad(mm, 2)}`);
  //   }
  // }, [currentTime, durationStartDate]);

  // TODO: Might be use
  // const renderTimerOperation = () => {
  //   const toSeconds = (hours: string) => {
  //     const hr = hours.split(':'); // split it at the colons
  //     return +hr[0] * 60 * 60 + +hr[1] * 60;
  //   };
  //   const exceeded = toSeconds(durationFrame) > toSeconds(duration) && '-';
  //   if (onActive) {
  //     if (isCreator) {
  //       return durationStartDate ? (
  //         <DurationWrapper>
  //           <StartedDuration fontSize={!md ? '1.2rem' : ''}>
  //             {exceeded}
  //             {durationFrame} /{' '}
  //           </StartedDuration>
  //           <TotalDuration fontSize={!md ? '1.2rem' : ''}>
  //             {duration}
  //           </TotalDuration>
  //         </DurationWrapper>
  //       ) : isDurationLoading ? (
  //         <Spin indicator={<LoadingOutlined style={loadingStyle} spin />} />
  //       ) : (
  //         <Button
  //           onClick={() => onClickStartDuration(campfireId)}
  //           style={durationButtonStyle}>
  //           Start Campfire
  //         </Button>
  //       );
  //     } else {
  //       return (
  //         <DurationWrapper>
  //           <StartedDuration fontSize={!md ? '1.2rem' : ''}>
  //             {exceeded}
  //             {durationFrame} /{' '}
  //           </StartedDuration>
  //           <TotalDuration fontSize={!md ? '1.2rem' : ''}>
  //             {duration}
  //           </TotalDuration>
  //         </DurationWrapper>
  //       );
  //     }
  //   } else {
  //     return null;
  //   }
  // };

  return (
    <Container className="titleName">
      <Overlay />
      <IconWrapper>
        <FireOutline {...iconDimension} />
      </IconWrapper>
      <Title padding="0 10px" lineHeight={!md ? '40px' : ''}>
        {title}
      </Title>
      {/* TODO: Might be use in the future */}
      {/* {renderTimerOperation()} */}
      <Description
        padding="0 10px"
        width={!md ? 'auto' : ''}
        fontSize={!md ? '0.8rem' : ''}>
        {description}
      </Description>

      {onActive && (
        <>
          <StartedTime>{elapseTime}</StartedTime>
          {/* <EditWrapper>
            <EditButton>EDIT CAMPFIRE</EditButton>
          </EditWrapper> */}
        </>
      )}
    </Container>
  );
};

export default TitleContent;
