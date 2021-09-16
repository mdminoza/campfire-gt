import styled from 'styled-components';
import { Card } from 'antd';
import { theme } from '../../../constants';

export const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  border: 0;
  border-radius: 0;
  padding: 20px 10px 10px;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: linear-gradient(to right, #2c2f4bcc, #2c2f4bcc),
    url('https://dummyimage.com/200x200/000/fff');
  .ant-card-body {
    padding: 0;
    height: 100%;
    justify-content: space-between;
    display: grid;
  }
`;

export const Column = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  vertical-align: middle;
  padding: 0;
  margin: 0;
  align-items: center;
`;

export const DescWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 40px 20px;
  margin: 0;
  align-items: center;
`;

export const AvatarWrapper = styled.div`
  background: ${theme.colors.mainWhite};
  padding: 5px;
  display: flex;
  justify-content: center;
  width: fit-content;
`;

export const Title = styled.text`
  font-family: ${theme.fonts.fontFamily};
  color: ${theme.colors.mainWhite};
  font-weight: 700;
  font-size: 2rem;
  text-align: center;
  margin-top: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
`;

export const MembersCountWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 180px;
`;
export const MembersCountText = styled.div`
  font-family: ${theme.fonts.fontFamily};
  color: ${theme.colors.mainWhite};
  font-weight: 700;
  font-size: 2rem;
  text-align: center;
  line-height: 1.8rem;
`;

export const MembersCountSubText = styled.div`
  font-family: ${theme.fonts.fontFamily};
  color: ${theme.colors.mainWhite};
  font-weight: 100;
  font-size: 1.5rem;
  text-align: center;
`;

export const Subtitle = styled.text`
  font-family: ${theme.fonts.fontFamily};
  color: ${theme.colors.mainWhite};
  font-weight: 100;
  font-size: 1.2rem;
  text-align: center;
`;

export const BtnTitle = styled.text`
  font-family: ${theme.fonts.fontFamily};
  font-weight: 600;
  font-size: 0.8rem;
  text-align: center;
`;

export const Description = styled.p`
  font-family: ${theme.fonts.fontFamily};
  color: ${theme.colors.mainWhite};
  font-weight: 100;
  font-size: 1.2rem;
  text-align: center;
  height: auto;
  width: 100%;
  margin-bottom: 0;

  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const btnStyleUninvited = {
  background: theme.colors.gray.grayDC,
  color: theme.colors.mainBlack,
  paddingTop: 10,
  paddingBottom: 10,
};

export const DividerStyle = {
  background: theme.colors.mainWhite,
  height: 130,
};
