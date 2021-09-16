import React from 'react';
import styled from 'styled-components';
import { Button, Result } from 'antd';

import { Campfire } from '../../../../common/domain/entities/campfire';
import { theme } from '../../../constants';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${theme.colors.mainWhite};
`;

type Props = {
  data: Partial<Campfire> | undefined;
  onClickRejoin: () => void;
  onClickHome: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
};

const ActiveResult = ({
  data,
  onClickRejoin,
  onClickHome,
  error,
}: Props): React.ReactElement => {
  const currentDate = new Date();
  let isStarted = false;

  if (data && data.scheduleToStart) {
    isStarted = currentDate > new Date(data.scheduleToStart);
  }
  const renderButton = () => {
    if (error) {
      return (
        <Button type="primary" onClick={onClickHome}>
          Back to Home
        </Button>
      );
    }
    if (isStarted) {
      return [
        <Button type="primary" onClick={onClickHome}>
          Back to Home
        </Button>,
        <Button type="primary" onClick={onClickRejoin}>
          Rejoin
        </Button>,
      ];
    }
    return (
      <Button type="primary" onClick={onClickHome}>
        Back to Home
      </Button>
    );
  };

  const isStartedMsg = isStarted
    ? 'You have left the campfire'
    : 'Sorry, campfire is not available at the moment.';

  return (
    <Container>
      <Result
        status="404"
        title="Oopss!"
        subTitle={
          error
            ? error?.message || 'Sorry, something went wrong.'
            : isStartedMsg
        }
        extra={renderButton()}
      />
    </Container>
  );
};

export default ActiveResult;
