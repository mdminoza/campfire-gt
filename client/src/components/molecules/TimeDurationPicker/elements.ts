import styled from 'styled-components';
import { theme } from '../../../constants';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 72px;
`;

export const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 35px;
  text-align: center;
  background: ${theme.colors.mainWhite};
  overflow-y: scroll;
  height: 200px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const TextWrapper = styled.div`
  property: inherit;
`;

export const TimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const TextStyle = styled.text`
  color: ${(props: { isSelected?: boolean }): string =>
    props?.isSelected ? theme.colors.red.light : theme.colors.gray.gray989};
  font-weight: ${(props: { isSelected?: boolean }): string =>
    props?.isSelected ? '700' : '100'};
  font-family: ${theme.fonts.fontFamily};
  font-size: 1.1rem;
  &:hover {
    color: ${theme.colors.red.light};
    font-weight: 700;
    cursor: pointer;
  }
`;

export const BtnStyle = {
  padding: '13px 0px',
  flex: 1,
  background: theme.colors.red.light,
  color: theme.colors.mainWhite,
  fontWeight: 700,
  fontSize: 15,
  width: '100%',
};
