import styled from 'styled-components';
import { Card } from 'antd';

import { theme } from '../../../constants';

// export const StyledCard = styled(Card)`
//   display: flex;
//   flex-direction: column;
//   border: 0;
//   border-radius: 0;
//   padding: ${(props: { isFeatured?: boolean }): string =>
//     props.isFeatured ? '24px 7px 17px' : '24px 7px 7px'};
//   height: 100%;

//   .ant-card-body {
//     padding: 0;
//   }
// `;

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  border: 0;
  border-radius: 0;
  padding-top: ${(props: { isFeatured?: boolean }): string =>
    props.isFeatured ? '24px' : '27px'};
  height: auto;
  min-width: 223px;
  .ant-card-body {
    padding: 0;
  }
`;

export const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  padding-left: ${(props: { padding?: string }): string =>
    props.padding ? props.padding : '0px'};
  padding-right: ${(props: { padding?: string }): string =>
    props.padding ? props.padding : '0px'};
`;

export const CardInfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  margin-bottom: 20px;
  padding-left: 17px;
  padding-right: 17px;
`;

export const CardTitle = styled.text`
  font-family: ${theme.fonts.fontFamily};
  font-weight: 700;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
`;

export const DescDate = styled.text`
  font-family: ${theme.fonts.fontFamily};
  font-weight: 100;
  font-size: 0.7rem;
  text-align: center;
`;

export const CardDesc = styled.p`
  font-family: ${theme.fonts.fontFamily};
  font-weight: 100;
  font-size: 0.6rem;
  text-align: center;
  padding: 7px 5px 0px;
  height: 52px;
  width: 100%;
  margin-bottom: 0;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const BtnTitle = styled.text`
  font-family: ${theme.fonts.fontFamily};
  font-weight: 600;
  font-size: 0.8rem;
  text-align: center;
`;

// export const btnStyleInvited = {
//   background: theme.colors.blue.primary,
//   color: theme.colors.mainWhite,
// };

export const btnStyleInvited = {
  color: theme.colors.blue.primary,
  borderTop: `1px solid ${theme.colors.blue.primary}`,
  paddingTop: 10,
  paddingBottom: 10,
};

// export const btnStyleUninvited = {
//   background: theme.colors.gray.darker,
//   color: theme.colors.mainWhite,
// };

export const btnStyleImInterested = {
  color: theme.colors.red.light,
  border: `1px solid ${theme.colors.red.light}`,
  paddingTop: 10,
  paddingBottom: 10,
};

export const btnStylePreRegistered = {
  color: theme.colors.mainWhite,
  background: theme.colors.red.light,
  paddingTop: 10,
  paddingBottom: 10,
};

export const btnStyleUninvited = {
  background: theme.colors.gray.grayDC,
  color: theme.colors.mainBlack,
  paddingTop: 10,
  paddingBottom: 10,
};

export const btnStyleWaiting = {
  background: theme.colors.gray.gray76,
  color: theme.colors.mainWhite,
  paddingTop: 10,
  paddingBottom: 10,
};

export const EmptySpace = styled.div`
  display: flex;
  flex: 1;
`;
export const IconWrapper = styled.div`
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Spacer = styled.div`
  width: 10px;
`;

export const Container = styled.div`
  background: ${theme.colors.gray.light};
  width: 100%;
  height: 100vh;
`;

export const AvatarContainer = styled.div`
  background: ${theme.colors.gray.grayEE};
  padding: 10px;
  display: flex;
  flex-direction: row;
`;

export const TextWrapper = styled.div`
  width: 70px;
`;

export const MembersCountText = styled.div`
  font-family: ${theme.fonts.fontFamily};
  font-weight: 100;
  font-size: 1.2rem;
  text-align: center;
  line-height: 0.9rem;
`;

export const MembersCountSubText = styled.div`
  font-family: ${theme.fonts.fontFamily};
  font-weight: 600;
  font-size: 0.8rem;
  text-align: center;
`;

export const DurationTitle = styled.text`
  font-family: ${theme.fonts.fontFamily};
  font-weight: 100;
  font-size: 0.7rem;
  text-align: center;
`;
