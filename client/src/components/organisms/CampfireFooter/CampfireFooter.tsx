/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Layout, Row, Col, Dropdown, Menu } from 'antd';
// import { Link } from 'react-router-dom';
import { Button } from '../../atoms/Button';
import { Avatar } from '../../atoms/Avatar';
// import { AudioMeter } from '../../atoms/AudioMeter';
// import { RoomControls } from '../../atoms/RoomControls';
import {
  EmojiCool,
  EmojiSmiley,
  EmojiSweat,
  EmojiWink,
  RaiseHand,
  MuteMic,
  UnmuteMic,
  // Close,
  // Refresh,
  // Mic,
  // MicOff,
  // Settings,
} from '../../atoms/Icons';
import { theme } from '../../../constants';

const { Footer } = Layout;

const StyledFooter = styled(Footer)`
  position: fixed;
  z-index: 2;
  width: 100%;
  bottom: 0;
  padding: 0;
  background-color: ${theme.colors.mainWhite};
`;

const StyledRow = styled(Row)`
  justify-content: center;
`;

// const BottomContainer = styled.div`
//   display: flex;
//   align-items: center;
//   border: thin solid rgb(0 0 0 / 27%);
//   border-radius: 15px;
// `;

// const Divider = styled.div`
//   width: 1px;
//   height: 40px;
//   background: black;
// `;

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
`;

// const LinkWrapper = styled(Link)``;

const IconLogo = styled.div`
  height: 50px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const EmojiWrapper = styled(Col)`
  padding-left: 8px;
`;

const EmojiButtonWrapper = styled.button`
  height: 45px;
  padding: 0;
  border: none;
  margin: 1px 2px 0;
  background-color: ${theme.colors.mainWhite};
  cursor: pointer;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const RaiseHandBtnContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RaiseHandLabel = styled.span`
  font-family: ${theme.fonts.fontFamily};
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 112.7%;
  letter-spacing: 0.02em;
  color: ${theme.colors.mainWhite};
  margin-left: 16px;
`;

const AvatarWrapper = styled.div`
  .styledAvatar {
    display: inline-block;
  }
  cursor: pointer;
`;

const RaiseHandWrapper = styled.div`
  width: 59px;
  height: 59px;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.mainBlack};
`;

const MuteBtnWrapper = styled.div`
  width: auto;
  background-color: ${theme.colors.gray.gray29};
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
`;

const MutedBtnWrapper = styled.div`
  background-color: #dfdfdf;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 170px;
`;

const MuteMeLabel = styled.span`
  font-family: ${theme.fonts.fontFamily};
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 0.02em;
  color: ${theme.colors.mainWhite};
`;

const StyledMenu = styled(Menu)`
  border: 2px solid #000000;
  .adminMenu {
    font-family: ${theme.fonts.fontFamily};
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.02em;

    color: ${theme.colors.mainBlack};
  }

  .adminMenuList {
    font-family: ${theme.fonts.fontFamily};
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.02em;
    color: ${theme.colors.gray.gray989};
  }
`;

const HiddenDropDownContainer = styled.div``;

type Props = {
  id: string;
  profileUrl: string;
  isSpeaker?: boolean;
  isRaising?: boolean;
  isTalking?: boolean;
  isMuted?: boolean;
  onClickRaiseHand: (id: string, isRaising: boolean) => void;
  onClickMuteMe?: (id: string, isMuted: boolean) => void;
  onClickEmoji?: (
    id: string,
    emojiType: 'wink' | 'smile' | 'sweat' | 'cool',
  ) => void;
  onClickMic?: () => void;
  isAdmin?: boolean;
  onClickProfileMenu?: (key: string) => void;
};

const HiddenContainer = styled.div`
  width: 59px;
  height: 59px;
  position: absolute;
  top: 0;
`;

const MuteLabel = styled.span``;

const UnLabel = styled.b`
  color: ${theme.colors.mainBlack};
`;

const CampfireFooter = ({
  id,
  profileUrl,
  isSpeaker = false,
  isRaising = false,
  isTalking = false,
  isMuted = false,
  onClickRaiseHand,
  onClickMuteMe = () => {},
  onClickEmoji = () => {},
  onClickMic = () => {},
  isAdmin = false,
  onClickProfileMenu = () => {},
}: Props): React.ReactElement => {
  const [onMute, setOnMute] = useState(false);
  const [onMenuProfile, setMenuProfile] = useState(false);
  // const [openSettings, setOpenSettings] = useState(false);
  // const history = useHistory();
  // const navigate = useNavigate();
  const width =
    isRaising && !isSpeaker
      ? { textAlign: 'end', paddingRight: 24 }
      : { width: 65 };

  const raiseHandBtnStyle = {
    backgroundColor: theme.colors.gray.gray29,
    ...width,
  };

  const muteMeBtnStyle = {
    width: 150,
    height: 35,
    marginLeft: 18,
    marginRight: 18,
    backgroundColor: theme.colors.mainBlack,
  };

  const unmuteMeBtnStyle = {
    backgroundColor: '#b2b2b2',
    height: 35,
    width: 'auto',
  };

  const emojiWinkStyle = { marginbottom: -1.3 };

  const emojiSmileyStyle = { marginBottom: 0.8 };

  const emojiSweatStyle = { marginBottom: 0.1 };

  const emojiCoolStyle = { marginBottom: 1.6 };

  const overlayStyle = {
    // paddingTop: 45,
  };

  const adminMenu = (
    <StyledMenu
      onClick={(menuItem: any) => onClickProfileMenu(menuItem.key.toString())}>
      <Menu.Item className="adminMenu" disabled key="1">
        ADMIN MENU
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item className="adminMenuList" key="muteAll">
        MUTE ALL
      </Menu.Item>
      <Menu.Item className="adminMenuList" key="unmuteAll">
        <MuteLabel>
          <UnLabel>UN</UnLabel>MUTE ALL
        </MuteLabel>
      </Menu.Item>
      <Menu.Item className="adminMenuList" key="kickAll">
        KICK ALL
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item className="adminMenuList" key="leaveCampfire">
        LEAVE CAMPFIRE
      </Menu.Item>
      <Menu.Item className="adminMenuList" key="endCampfire">
        END CAMPFIRE
      </Menu.Item>
    </StyledMenu>
  );

  const menu = (
    <StyledMenu
      onClick={(menuItem: any) => onClickProfileMenu(menuItem.key.toString())}>
      <Menu.Item className="adminMenu" disabled key="1">
        MENU
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item className="adminMenuList" key="leaveCampfire">
        LEAVE CAMPFIRE
      </Menu.Item>
    </StyledMenu>
  );

  const handleOnClickMic = () => {
    setOnMute(!onMute);
    onClickMic();
  };

  // const handleOnClickSettings = () => {
  //   setOpenSettings(!openSettings);
  // };

  const handleOnClickProfile = () => {
    setMenuProfile(!onMenuProfile);
  };

  useEffect(() => {
    const onClickEvent = (e: any) => {
      if (e.target && e.target.id !== '_profileMenu') {
        setMenuProfile(false);
      }
    };
    if (onMenuProfile) {
      window.addEventListener('click', onClickEvent);
    }
  }, [onMenuProfile]);

  const handleNavigation = useCallback(() => {
    setMenuProfile(false);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation]);

  return (
    <StyledFooter>
      <StyledRow>
        <Col onClick={handleOnClickProfile} flex="59px">
          <AvatarWrapper>
            <Dropdown
              placement="topCenter"
              overlayClassName="adminMenuDropdown"
              overlay={isAdmin ? adminMenu : menu}
              overlayStyle={overlayStyle}
              visible={onMenuProfile}>
              <HiddenDropDownContainer />
            </Dropdown>
            <Avatar size={59} src={profileUrl} alt="Campfire" />
            {!isSpeaker && isRaising && (
              <RaiseHandWrapper>
                <RaiseHand width={28} height={40} />
              </RaiseHandWrapper>
            )}
            <HiddenContainer id="_profileMenu" />
          </AvatarWrapper>
        </Col>
        <Col flex="auto">
          {isSpeaker && !isRaising && !isMuted ? (
            <MuteBtnWrapper>
              {isTalking && <RaiseHandLabel>I AM TALKING</RaiseHandLabel>}
              <Button
                style={muteMeBtnStyle}
                onClick={() => onClickMuteMe(id, isMuted)}>
                <MuteMeLabel>MUTE ME</MuteMeLabel>
              </Button>
            </MuteBtnWrapper>
          ) : isSpeaker && !isRaising && isMuted ? (
            <MutedBtnWrapper>
              <Button
                style={unmuteMeBtnStyle}
                onClick={() => onClickMuteMe(id, isMuted)}>
                <MuteMeLabel>UNMUTE ME</MuteMeLabel>
              </Button>
            </MutedBtnWrapper>
          ) : (
            <Button
              style={raiseHandBtnStyle}
              onClick={() => onClickRaiseHand(id, isRaising)}>
              {!isSpeaker && isRaising ? (
                <RaiseHandLabel>MY HAND IS RAISED</RaiseHandLabel>
              ) : (
                <RaiseHandBtnContent>
                  <RaiseHand width={22} height={27} />
                  {/* <RaiseHandLabel>RAISE HAND</RaiseHandLabel>  */}
                </RaiseHandBtnContent>
              )}
            </Button>
          )}
        </Col>
        {((!isTalking && !isSpeaker) || (isMuted && isSpeaker)) && (
          <EmojiWrapper flex="220px">
            <EmojiButtonWrapper onClick={() => onClickEmoji(id, 'wink')}>
              <EmojiWink style={emojiWinkStyle} width={46} height={44} />
            </EmojiButtonWrapper>
            <EmojiButtonWrapper onClick={() => onClickEmoji(id, 'smile')}>
              <EmojiSmiley style={emojiSmileyStyle} width={46} height={43} />
            </EmojiButtonWrapper>
            <EmojiButtonWrapper onClick={() => onClickEmoji(id, 'sweat')}>
              <EmojiSweat width={43} height={52} style={emojiSweatStyle} />
            </EmojiButtonWrapper>
            <EmojiButtonWrapper onClick={() => onClickEmoji(id, 'cool')}>
              <EmojiCool style={emojiCoolStyle} width={46} height={43} />
            </EmojiButtonWrapper>
          </EmojiWrapper>
        )}
        <OptionContainer>
          <IconLogo onClick={handleOnClickMic}>
            {onMute ? (
              <MuteMic width={42} height={42} />
            ) : (
              <UnmuteMic width={42} height={42} />
            )}
          </IconLogo>
          {/* <Divider />
          <IconLogo onClick={() => {}}>
            <AudioMeter level={60} />
          </IconLogo>
          <IconLogo onClick={handleOnClickMic}>
            {onMute ? <MicOff /> : <Mic />}
          </IconLogo>
          <Divider />
          <IconLogo onClick={() => {}}>
            <Refresh />
          </IconLogo>
          <LinkWrapper to="">
            <IconLogo>
              <Close />
            </IconLogo>
          </LinkWrapper>
          <Divider />
          <IconLogo onClick={handleOnClickSettings}>
            <Settings />
            {openSettings && <RoomControls onClick={handleOnClickSettings} />}
          </IconLogo> */}
        </OptionContainer>
      </StyledRow>
    </StyledFooter>
  );
};

export default CampfireFooter;
