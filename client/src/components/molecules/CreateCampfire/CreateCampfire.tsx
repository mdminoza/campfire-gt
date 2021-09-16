/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import moment from 'moment';
import { LoadingOutlined } from '@ant-design/icons';
import { Row, Col, Grid } from 'antd';
import { Checkbox } from '../../atoms/Checkbox';
import { TextInput } from '../../atoms/TextInput';
import { Button } from '../../atoms/Button';
import { DateTimePicker } from '../DateTimePicker';
import { TimeDurationPicker } from '../TimeDurationPicker';
import { InviteTags } from '../InviteTags';
import { ScheduleTypes } from '../DateTimePicker/types';
import {
  Container,
  StyledRow,
  StyledCol,
  Spacer,
  // btnStyle,
  InfoTitle,
  InfoSubtitle,
  CreateCampireBtnStyle,
  Title,
  SubTitle,
  TitleWrapper,
  StyledDivider,
  StyledText,
  CreateCampireBtnStyle2,
  ToggleWrapper,
  Wrapper,
  BtnWrapper,
  SchedulePickerWrapper,
  InvitePickerWrapper,
  TextWrapper,
  LineSpace,
  CheckboxContainer,
  CheckBoxWrapper,
  TextInputWrapper,
  DurationTimePickerWrapper,
  HourMinLabel,
} from './elements';
import { theme } from '../../../constants';
import { months as monthsList } from '../../../utils/helpers/constants';
import { Avatar } from '../../atoms/Avatar';

type Props = {
  // profile: React.ReactElement;
  profileUrl?: string;
  checked?: boolean;
  toggled?: boolean;
  isInviteTagOpen?: boolean;
  fetchUserList?: (username: string) => void;
  onChangeCheckbox: () => void;
  onPress: () => void;
  onPressSubmit: () => void;
  onChangeTopic: (value: string) => void;
  onChangeDescription: (value: string) => void;
  onChangeScheduleTostart: (value: string) => void;
  onChangeOpenTo: (type: string, invited: Object[]) => void;
  onChangeDuration: (duration: string) => void;
  onClickShowInvites?: (value: boolean) => void;
  topicValue: string;
  descriptionValue: string;
  isLoading?: boolean;
};

const { useBreakpoint } = Grid;

const CreateCampfire = ({
  profileUrl = 'https://i.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
  checked = false,
  toggled = false,
  isLoading = false,
  fetchUserList = () => null,
  onClickShowInvites = () => {},
  isInviteTagOpen = false,
  onChangeCheckbox,
  onPress,
  onPressSubmit,
  onChangeTopic,
  onChangeDescription,
  onChangeScheduleTostart,
  onChangeOpenTo,
  onChangeDuration,
  topicValue,
  descriptionValue,
}: Props): React.ReactElement => {
  const [scheduleText, setScheduleText] = useState('IMMEDIATELY');
  const [showPicker, setShowPicker] = useState(false);
  const [showDurationPicker, setDurationPicker] = useState(false);
  const [radioVal, setRadioVal] = React.useState<'Everyone' | 'Invite Only'>(
    'Everyone',
  );
  const [hour, setHour] = useState('01');
  const [minutes, setMinutes] = useState('00');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [breakPoint, setBreakPoint] = useState<any[]>([]);
  const screens = useBreakpoint();
  // const [screenSize, setScreenSize] = useState('');
  // const [options, setOptions] = React.useState<[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scheduleWrapperRef = useRef<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inviteWrapperRef = useRef<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const durationWrapperRef = useRef<any>();

  const handleSchedulePicker = (
    params: ScheduleTypes,
    isImmediately?: boolean,
  ) => {
    const currentYear = moment().year();
    let formattedMonth = '';
    let day = '';
    let formattedTime = '';
    let formatMonth = '';
    let formatDay = '';
    if (params.month) {
      // formattedMonth = moment().month(params.month).format('MMMM');
      formattedMonth = monthsList[params.month];
      formatMonth = params?.month > 9 ? `${params.month}` : `0${params.month}`;
    }

    if (params.day) {
      day = params.day.toString();
      formatDay = params?.day > 9 ? `${params.day}` : `0${params.day}`;
    }
    if (params.time)
      formattedTime = moment(params.time, 'hh:mm').format('hh:mm a');
    const formattedDate = `${formattedMonth} ${day} : ${formattedTime}`;
    const dateString = `${currentYear}-${formatMonth}-${formatDay}T${params.time}:00`;
    const updateText = isImmediately ? 'IMMEDIATELY' : formattedDate;
    if (isImmediately || (params.month && params.day && params.time)) {
      setScheduleText(updateText);
      setShowPicker(false);
      onChangeScheduleTostart(isImmediately ? 'IMMEDIATELY' : dateString);
    }
  };

  const handleSelectInvite = (selected: Object[], type: string) => {
    if (type === 'Everyone' || (type === 'Invite Only' && selected.length)) {
      onChangeOpenTo(type, selected);
      onClickShowInvites(false);
    }
  };

  const handleSetDuration = (
    hourDuration: React.SetStateAction<string>,
    minutesDuration: React.SetStateAction<string>,
  ): void => {
    setHour(hourDuration);
    setMinutes(minutesDuration);
    setDurationPicker(false);
    onChangeDuration(`${hourDuration}:${minutes}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (e: any) => {
    if (!scheduleWrapperRef?.current?.contains(e.target)) {
      setShowPicker(false);
    }

    if (!inviteWrapperRef?.current?.contains(e.target)) {
      if (!dropdownVisible) {
        onClickShowInvites(false);
      }
    }

    if (!durationWrapperRef?.current?.contains(e.target)) {
      setDurationPicker(false);
    }
  };

  const handleShowInvites = () => {
    onClickShowInvites(true);
    setShowPicker(false);
    setDurationPicker(false);
  };

  const handleShowSchedulePicker = () => {
    onClickShowInvites(false);
    setShowPicker(true);
    setDurationPicker(false);
  };

  const handleShowDurationPicker = () => {
    onClickShowInvites(false);
    setShowPicker(false);
    setDurationPicker(true);
  };

  function Profile() {
    if (breakPoint.length < 2) {
      return <Avatar size={38} src={profileUrl} />;
    }
    return <Avatar src={profileUrl} />;
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });

  useEffect(() => {
    const fooz = Object.entries(screens).filter((screen) => !!screen[1]);
    try {
      setBreakPoint(fooz);
    } catch (err) {
      console.log(err);
    }
  }, [screens]);

  useEffect(() => {
    if (!toggled) {
      setScheduleText('IMMEDIATELY');
      setRadioVal('Everyone');
      setHour('01');
      setMinutes('00');
    }
  }, [toggled]);

  const loaderStyle = {
    fontSize: 32,
    color: theme.colors.mainWhite,
    marginBottom: 16,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeRadio = (e: any) => {
    setRadioVal(e.target.value);
  };

  return (
    <Container>
      <Wrapper>
        <StyledRow gutter={[8, 0]}>
          <Col xs={24} sm={24} md={8}>
            <TextInputWrapper>
              <TextInput
                placeholder="CREATE TOPIC"
                addonBefore={Profile()}
                size={breakPoint.length < 2 ? 'middle' : 'large'}
                onChange={onChangeTopic}
                value={topicValue}
                maxLength={24}
              />
            </TextInputWrapper>
          </Col>
          {breakPoint.length < 2 && <LineSpace />}
          <Col xs={24} sm={24} md={16}>
            <TextInput
              onChange={onChangeDescription}
              value={descriptionValue}
              placeholder="CREATE DESCRIPTION"
              size={breakPoint.length <= 2 ? 'middle' : 'large'}
            />
          </Col>
        </StyledRow>
        <LineSpace />
        <Row>
          <Col xs={24} sm={14} md={15}>
            <CheckBoxWrapper>
              <CheckboxContainer>
                <Checkbox checked={checked} onChange={onChangeCheckbox} />
              </CheckboxContainer>
              <InfoTitle>Make This Campfire HIDDEN</InfoTitle>
              <br />
              <InfoSubtitle>
                will not show up in public list / invite only
              </InfoSubtitle>
            </CheckBoxWrapper>
          </Col>
          <Col xs={24} sm={10} md={9}>
            <BtnWrapper toggled={!toggled}>
              <Button
                onClick={onPress}
                style={{
                  ...CreateCampireBtnStyle,
                  fontSize: breakPoint.length <= 1 ? 14 : 18,
                }}>
                CREATE A CAMPFIRE
              </Button>
            </BtnWrapper>
          </Col>
        </Row>
      </Wrapper>
      <ToggleWrapper toggled={toggled}>
        <StyledRow>
          <TitleWrapper>
            <SubTitle>MY CAMPFIRE</SubTitle>
            <Title>{topicValue.toLocaleUpperCase()}</Title>
          </TitleWrapper>
        </StyledRow>
        <StyledDivider />
        <StyledRow gutter={[32, 0]}>
          <StyledCol span={12} right>
            <StyledText>Scheduled To Start:</StyledText>
          </StyledCol>
          <StyledCol span={12}>
            <TextWrapper onClick={handleShowSchedulePicker}>
              <StyledText placeValue>{scheduleText}</StyledText>
            </TextWrapper>
            <SchedulePickerWrapper
              ref={scheduleWrapperRef}
              className="ScheduleWrapper"
              toggled={showPicker}
              isSmallScreen={breakPoint.length < 2}>
              <DateTimePicker
                setSchedule={handleSchedulePicker}
                breakpoints={breakPoint}
                toggle={toggled}
              />
            </SchedulePickerWrapper>
          </StyledCol>
        </StyledRow>
        <StyledRow gutter={[32, 0]}>
          <StyledCol span={12} right>
            <StyledText>Open To:</StyledText>
          </StyledCol>
          <StyledCol span={12}>
            <TextWrapper onClick={handleShowInvites}>
              <StyledText placeValue>{radioVal.toUpperCase()}</StyledText>
            </TextWrapper>
            <InvitePickerWrapper
              ref={inviteWrapperRef}
              className="InviteWrapper"
              toggled={isInviteTagOpen}
              isSmallScreen={breakPoint.length < 2}>
              <InviteTags
                radioVal={radioVal}
                onChangeRadio={onChangeRadio}
                setInvite={handleSelectInvite}
                fetchUserList={fetchUserList}
                onDropdownVisibleChange={setDropdownVisible}
              />
            </InvitePickerWrapper>
          </StyledCol>
        </StyledRow>
        <StyledRow gutter={[32, 0]}>
          <StyledCol span={12} right>
            <StyledText>Duration:</StyledText>
          </StyledCol>
          <StyledCol span={12}>
            <TextWrapper onClick={handleShowDurationPicker}>
              <StyledText placeValue>
                {hour}:{minutes}
              </StyledText>
              <HourMinLabel>(h:min)</HourMinLabel>
            </TextWrapper>
            <DurationTimePickerWrapper
              ref={durationWrapperRef}
              className="DurationPickerWrapper"
              toggled={showDurationPicker}>
              <TimeDurationPicker
                toggle={toggled}
                setDuration={handleSetDuration}
              />
            </DurationTimePickerWrapper>
          </StyledCol>
        </StyledRow>
        <Spacer />
        <StyledRow justify="center">
          {isLoading ? (
            <LoadingOutlined style={loaderStyle} />
          ) : (
            <Button
              disabled={showPicker || isInviteTagOpen || showDurationPicker}
              onClick={onPressSubmit}
              style={{
                ...CreateCampireBtnStyle2,
                fontSize: breakPoint.length <= 1 ? 14 : 18,
              }}>
              CREATE A CAMPFIRE
            </Button>
          )}
        </StyledRow>
      </ToggleWrapper>
    </Container>
  );
};

export default CreateCampfire;
