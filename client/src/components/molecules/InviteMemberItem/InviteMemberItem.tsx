import React from 'react';
import styled from 'styled-components';
import { Card, Dropdown, Menu } from 'antd';

import { Avatar } from '../../atoms/Avatar';
import { theme } from '../../../constants';

const AvatarWrapper = styled.div``;

const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 0 0 8px;
    text-align: center;
  }
  .ant-card-head {
    padding: 0;
    margin-bottom: 0;
    border: ${(props: { isActive?: boolean }) =>
      props.isActive ? `5px solid ${theme.colors.blue.primary}` : 'none'};
    border-radius: 0;
  }
  .ant-card-head-title {
    padding: 0;
  }
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

const HiddenContainer = styled.div`
  width: 80px;
  height: 110px;
  position: absolute;
  top: 0;
`;

const HiddenDropDownContainer = styled.div``;

type Props = {
  url: string;
  name: string;
  selectedId?: string;
  id: string;
  onClickMenu: (key: string) => void;
  onClick: (id: string) => void;
};

const InviteMemberItem = ({
  url,
  name,
  id,
  selectedId,
  onClickMenu,
  onClick,
}: Props): React.ReactElement => {
  const menu = (
    <StyledMenu onClick={(menuItem) => onClickMenu(menuItem.key.toString())}>
      <Menu.Item className="adminMenu" disabled key="1">
        ADMIN MENU
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item className="adminMenuList" key="accept">
        ACCEPT
      </Menu.Item>
      <Menu.Item className="adminMenuList" key="acceptAll">
        ACCEPT ALL
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item className="adminMenuList" key="decline">
        DECLINE
      </Menu.Item>
      <Menu.Item className="adminMenuList" key="declineAll">
        DECLINE ALL
      </Menu.Item>
    </StyledMenu>
  );

  const handleClick = () => onClick(id);

  const cardStyle = {
    width: 80,
    backgroundColor: theme.colors.gray.dark,
  };

  const cardBodyStyle = {
    paddingVertical: 0,
    paddingHorizontal: 0,
  } as React.CSSProperties;

  const overlayStyle = {
    paddingTop: 20,
  };

  return (
    <StyledCard
      onClick={handleClick}
      hoverable
      style={cardStyle}
      bordered={false}
      bodyStyle={cardBodyStyle}
      title={
        <AvatarWrapper>
          <Dropdown
            overlayClassName="adminMenuDropdown"
            overlay={menu}
            overlayStyle={overlayStyle}
            visible={selectedId === id}>
            <HiddenDropDownContainer />
          </Dropdown>
          <Avatar src={url} size={80} name={name} />
          <HiddenContainer id="_memberCard" />
        </AvatarWrapper>
      }>
      <></>
    </StyledCard>
  );
};

export default InviteMemberItem;
