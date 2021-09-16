import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #2c2c2c;

  .ant-spin-dot-item {
    background-color: #e75a0b;
  }
`;

type Props = {
  style?: Object;
};

const Loader = ({ style = {} }: Props): React.ReactElement => (
  <Wrapper style={style}>
    <Spin size="large" />
  </Wrapper>
);

export default Loader;
