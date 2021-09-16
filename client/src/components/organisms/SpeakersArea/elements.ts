import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../../../constants';

// export const StyledCard = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   background: ${theme.colors.gray.light};
//   padding-bottom: 24px;
//   margin: 0 40px 0;
// `;

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.gray.light};
  padding-bottom: 24px;
  margin: 0 40px 0;
  border-bottom: 1px ${theme.colors.mainBlack} solid;
  @media (max-width: 500px) {
    margin: 0;
  }
`;

export const TitleWrapper = styled.div`
  text-align: center;
  width: 100%;
`;

export const Title = styled.text`
  font-family: ${theme.fonts.fontFamily};
  font-weight: 300;
  font-size: 1.5rem;
`;

// export const SpeakersWrapper = styled.div`
//   display: flex;
//   flex-direction: inherit;
//   justify-content: center;
//   align-items: center;
//   margin-top: 18px;
//   .styledAvatar {
//     display: inline-block;
//   }
// `;

export const SpeakersWrapper = styled.div`
  display: flex;
  flex-direction: inherit;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  .styledAvatar {
    display: inline-block;
  }
`;

export const Container = styled.div`
  background: ${theme.colors.gray.light};
  height: 100vh;
  width: 100vw;
`;

export const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.gray.dark};
  padding: 24px 0;
  margin: 0 40px 0;
  @media (max-width: 500px) {
    margin: 0;
  }
`;

// export const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${theme.colors.gray.light};
`;

export const SubTitle = styled.text`
  font-family: ${theme.fonts.fontFamily};
  font-weight: 700;
  font-size: 1.2rem;
  color: ${theme.colors.gray.gray8E};
`;

export const NoSpeakerWrapper = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
`;

export const ButtoWrapper = styled.div`
  width: 100%;
`;

export const LeaveButton = styled.div`
  background: ${theme.colors.gray.light};
  float: right;
  width: 130px;
  text-align: center;
  font-weight: 700;
  font-size: 12px;
  line-height: 24px;
  cursor: pointer;
  color: ${theme.colors.mainBlack};
`;

export const LinkWrapper = styled(Link)``;
