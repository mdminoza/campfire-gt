import styled from 'styled-components';
import { Row, Col } from 'antd';
import { theme } from '../../../constants';

export const StyledRow = styled(Row)`
  padding-left: 6px;
`;

export const StyledCol = styled(Col)``;

export const StyledText = styled.text<{ heading?: boolean }>`
  font-family: ${theme.fonts.fontFamily};
  font-weight: 700;
  font-size: ${(props): string => (props.heading ? '13' : '10')}px;
  word-break: break-all;
  line-height: 12px;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 7px;
`;

export const Container = styled.div`
  width: 209px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
