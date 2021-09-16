import styled from 'styled-components';
import { Col } from 'antd';

export const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: inherit;
  .styledAvatar {
    display: inline-block;
  }
`;

export const ItemWrapper = styled.div`
  text-align: -webkit-center;
`;

export const ItemCol = styled(Col)`
  text-align: -webkit-center;
`;

export const NoMemberWrapper = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
`;
