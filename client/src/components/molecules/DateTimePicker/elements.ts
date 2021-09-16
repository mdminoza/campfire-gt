import styled from 'styled-components';
import { theme } from '../../../constants';

export const Container = styled.div`
  width: ${(props: { isSmallScreen?: boolean }): string =>
    props?.isSmallScreen ? '300px' : '330px'};
  height: 430px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const MonthWrapper = styled.div`
  background: ${theme.colors.mainWhite};
  justify-content: center;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const OptionWrapper = styled.div`
  background: ${theme.colors.mainWhite};
  padding: 40px 15px 10px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const TimeWrapper = styled.div`
  background: ${theme.colors.mainWhite};
  display: flex;
  flex-direction: row;
  width: 85px;
  justify-content: space-between;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const TextWrapper = styled.div`
  property: inherit;
`;

export const TextStyle = styled.text`
  color: ${(props: { isSelected?: boolean }): string =>
    props?.isSelected ? theme.colors.red.light : theme.colors.gray.gray989};
  font-weight: ${(props: { isSelected?: boolean }): string =>
    props?.isSelected ? '700' : '100'};
  font-family: ${theme.fonts.fontFamily};
  font-size: 1.1rem;
  ${TimeWrapper}:hover & {
    color: ${theme.colors.red.light};
    font-weight: 700;
    cursor: pointer;
  }
  ${TextWrapper}:hover & {
    color: ${theme.colors.red.light};
    font-weight: 700;
    cursor: pointer;
  }
`;

export const TextStyle2 = styled.text`
  font-family: ${theme.fonts.fontFamily};
  color: ${(props: { isSelected?: boolean }): string =>
    props?.isSelected ? theme.colors.red.light : theme.colors.mainBlack};
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 35px;
  ${TextWrapper}:hover & {
    color: ${theme.colors.red.light};
    font-weight: 700;
    cursor: pointer;
  }
`;

export const BtnStyle = {
  paddingTop: 13,
  paddingBottom: 13,
  flex: 1,
  background: theme.colors.red.light,
  color: theme.colors.mainWhite,
  fontWeight: 700,
  fontSize: 18,
  width: '100%',
};

export const StoryContainer = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  width: 100%;
  background: ${theme.colors.blue.primary};
`;
