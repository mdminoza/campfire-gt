import styled from 'styled-components';
import { Row, Col, Divider } from 'antd';
import { theme } from '../../../constants';

export const Container = styled.div`
  background: ${theme.colors.gray.gray29};
  flex-direction: column;
  width: 100%;
`;

export const Wrapper = styled.div`
  padding: 30px 30px 15px 30px;
`;

export const StyledRow = styled(Row)<{ height?: number }>`
  display: flex;
  flex-direction: row;
`;

export const StyledCol = styled(Col)`
  flex: 1;
  text-align: ${(props: { right?: boolean }): string =>
    props.right ? 'right' : 'left'};
`;

export const Spacer = styled.div`
  height: 60px;
  width: 100%;
`;

export const TextInputWrapper = styled.div`
  width: 100%;
  height: '45px';
`;

export const InfoTitle = styled.text`
  font-family: ${theme.fonts.fontBoldFamily}
  font-size: 12px;
  font-weight: 700;
  color: ${theme.colors.mainWhite};
`;

export const InfoSubtitle = styled.text`
  font-family: ${theme.fonts.fontFamily};
  font-size: 0.8rem;
  font-weight: 100;
  font-style: italic;
  color: ${theme.colors.mainWhite};
`;

export const Title = styled.text`
  font-family: ${theme.fonts.fontFamily};
  font-size: 2.5rem;
  line-height: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.mainWhite};
`;

export const SubTitle = styled.text`
  font-family: ${theme.fonts.fontFamily};
  font-size: 1.5rem;
  font-weight: 100;
  color: ${theme.colors.mainWhite};
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  bacgkround: pink;
  width: 100%;
`;

export const StyledDivider = styled(Divider)`
  width: 100%;
  border-color: ${theme.colors.mainWhite};
`;

export const StyledText = styled.text`
  font-family: ${theme.fonts.fontFamily};
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.mainWhite};
  text-decoration: ${(props: { placeValue?: boolean }): string =>
    props.placeValue ? 'underline solid #ffffff' : 'none'};
`;

export const TextWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
`;

export const BtnWrapper = styled.div`
  display: ${(props: { toggled?: boolean }): string =>
    props.toggled ? 'block' : 'none'};
`;

export const ToggleWrapper = styled.div`
  display: ${(props: { toggled?: boolean }): string =>
    props.toggled ? 'block' : 'none'};
  background: ${theme.colors.gray.gray29};
  padding: 0 30px 15px 30px;
`;

export const btnStyle = {
  minHeight: 70,
  paddingTop: 15,
};

type Props = {
  toggled?: boolean;
  isSmallScreen?: boolean;
};

// TODO: create container with toggle & overlay for schedule picker
export const SchedulePickerWrapper = styled.div`
  display: ${(props: Props): string => (props.toggled ? 'block' : 'none')};
  position: absolute;
  z-index: 1;
  top: -10px;
  left: ${(props: Props): string => (props.isSmallScreen ? '-151px' : '1px')};
  .ScheduleWrapper {
    display: ${(props: Props): string => (props.toggled ? 'block' : 'none')};
  }
`;

export const InvitePickerWrapper = styled.div`
  display: ${(props: Props): string => (props.toggled ? 'block' : 'none')};
  position: absolute;
  z-index: 1;
  top: 0px;
  left: ${(props: Props): string => (props.isSmallScreen ? '-151px' : '8px')};
  width: ${(props: Props): string => (props.isSmallScreen ? '300px' : '430px')};
  .InviteWrapper {
    display: ${(props: Props): string => (props.toggled ? 'block' : 'none')};
  }
`;

export const DurationTimePickerWrapper = styled.div`
  display: ${(props: { toggled?: boolean }): string =>
    props.toggled ? 'block' : 'none'};
  position: absolute;
  z-index: 1;
  top: 7px;
  left: 16px;
  .DurationPickerWrapper {
    display: ${(props: { toggled?: boolean }): string =>
      props.toggled ? 'block' : 'none'};
  }
`;

export const CheckboxContainer = styled.div`
  padding-top: 7px;
  width: 40px;
`;

export const LineSpace = styled.div`
  height: 7px;
  width: 100%;
`;

export const CheckBoxWrapper = styled.div`
  display: -webkit-box;
`;

export const HourMinLabel = styled.span`
  font-family: ${theme.fonts.fontFamily};
  font-size: 1rem;
  color: #bfbfbf;
  margin-left: 8px;
`;

// Create Campfire Style Button
export const CreateCampireBtnStyle = {
  paddingTop: 13,
  paddingBottom: 13,
  flex: 1,
  background: theme.colors.gray.gray29,
  border: 1,
  borderStyle: 'solid',
  borderColor: theme.colors.mainWhite,
  color: theme.colors.mainWhite,
  fontWeight: 700,
  fontSize: 18,
  alignItems: 'center',
  paddingLeft: 10,
  paddingRight: 0,
};

export const CreateCampireBtnStyle2 = {
  paddingTop: 13,
  paddingBottom: 13,
  flex: 1,
  border: 1,
  borderStyle: 'solid',
  background: theme.colors.gray.gray29,
  borderColor: theme.colors.mainWhite,
  color: theme.colors.mainWhite,
  fontWeight: 700,
  fontSize: 18,
  maxWidth: 350,
};
