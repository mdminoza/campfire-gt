import React from 'react';
import styled from 'styled-components';
import { Layout, Row, Col, Menu, Dropdown, Grid } from 'antd';

import { AppLogo, Audio, MenuOutlined } from '../../atoms/Icons';
import { StyledLink } from '../../atoms/StyledLink';

import { theme } from '../../../constants';

const { Header } = Layout;

const { useBreakpoint } = Grid;

const StyledHeader = styled(Header)`
  position: fixed;
  z-index: 2;
  width: 100%;
  background-color: #ffffff;
  padding: ${(props: { headerPadding?: string }) =>
    props.headerPadding || '0 0 0 50px'};
`;

const LogoWrapper = styled(Col)`
  display: flex;
  align-items: center;
`;

const MobileLogoWrapper = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const AvatarWrapper = styled(Col)`
  display: flex;
  justify-content: flex-end;
`;

const LinkWrapper = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarImage = styled.img`
  width: 64px;
  height: 64px;
`;

const LabelWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  top: 45px;
  display: flex;
  justify-content: center;
`;

const Label = styled.span`
  display: flex;
  background-color: ${theme.colors.mainWhite};
  padding: 6px 24px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  line-height: 25px;

  text-align: center;
  letter-spacing: 0.02em;
`;

const LabelIconWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-right: 12px;
`;

const StyledButton = styled.button`
  height: 64px;
  padding: 0;
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const LogoLabel = styled.span`
  font-style: normal;
  font-weight: bold;
  font-size: ${(props: { fontSize?: string }) => props?.fontSize || '0.65rem'};
  line-height: 22px;
  position: absolute;
  letter-spacing: 0.02em;
  bottom: 0;
  left: 32px;
  color: ${theme.colors.mainBlack};
`;

type LinkProps = {
  label: string;
  onClick: () => void;
  link: string;
  active: boolean;
};

type Props = {
  headerMessage: string;
  avatarUrl: string;
  isOnTopic?: boolean;
  items: LinkProps[];
  onClickMenu?: (key: string) => void;
  onClickBurgerMenu?: () => void;
};

const CampfireHeader = ({
  headerMessage,
  avatarUrl,
  isOnTopic,
  items,
  onClickMenu = () => {},
  onClickBurgerMenu = () => {},
}: Props): React.ReactElement => {
  const screens = useBreakpoint();

  const { xs, lg, md, xl, xxl } = screens;

  const menu = (
    <Menu onClick={(menuItem) => onClickMenu(menuItem.key.toString())}>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <StyledHeader headerPadding={!lg ? '0 0 0 20px' : ''}>
      <Row>
        {!md ? (
          <MobileLogoWrapper span={12}>
            <AppLogo width={140} />
            <LogoLabel fontSize={xs ? '0.5rem' : ''}>{headerMessage}</LogoLabel>
          </MobileLogoWrapper>
        ) : (
          <LogoWrapper span={4}>
            <AppLogo />
          </LogoWrapper>
        )}
        {(md || lg || xl || xxl) && (
          <LinkWrapper span={16}>
            {items.map((item) => (
              <StyledLink
                label={item.label}
                onClick={item.onClick}
                to={item.link}
                active={item.active}
              />
            ))}
          </LinkWrapper>
        )}
        <AvatarWrapper span={!md ? 12 : 4}>
          {!md ? (
            <StyledButton onClick={onClickBurgerMenu}>
              <MenuOutlined />
            </StyledButton>
          ) : (
            /* TODO: Sample dropdown just for logout purposes */
            <Dropdown overlay={menu} trigger={['click']}>
              <AvatarImage src={avatarUrl} />
            </Dropdown>
          )}
        </AvatarWrapper>
      </Row>
      {(md || lg || xl || xxl) && (
        <LabelWrapper>
          <Label>
            {isOnTopic && (
              <LabelIconWrapper>
                <Audio />
              </LabelIconWrapper>
            )}
            {headerMessage}
          </Label>
        </LabelWrapper>
      )}
    </StyledHeader>
  );
};

export default CampfireHeader;
