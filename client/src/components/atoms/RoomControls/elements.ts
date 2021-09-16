import styled from 'styled-components';
import { theme } from '../../../constants';

export const Container = styled.div`
  position: fixed;
  bottom: 50px;
  margin-right: 73px;
  z-index: 10;
`;

export const Wrapper = styled.div`
  background: ${theme.colors.mainWhite};
  width: max-content;
`;

export const ButtonStyle = styled.div`
  font-family: ${theme.fonts.fontFamily};
  font-size: 14px;
  font-weight: bold;
  border: 2px solid ${theme.colors.mainBlack};
  cursor: pointer;
`;
