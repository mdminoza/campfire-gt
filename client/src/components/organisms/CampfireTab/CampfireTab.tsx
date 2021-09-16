import React from 'react';
import styled from 'styled-components';
import { Tabs } from 'antd';

import { theme } from '../../../constants';

const { TabPane } = Tabs;

type TabProps = {
  key: string;
  title: string;
  count: number;
  children: React.ReactNode;
};

type Props = {
  onChange: (key: string) => void;
  tabs: TabProps[];
};

const StyledTabs = styled(Tabs)`
  background-color: ${theme.colors.gray.light};
`;

const TabWrapper = styled.div`
  .ant-tabs-ink-bar {
    height: 1.5px !important;
    background: ${theme.colors.mainBlack} !important;
  }

  .ant-tabs-nav {
    &:before {
      border-bottom: 1.5px solid ${theme.colors.gray.grayb9};
    }
  }
`;

const TabTitleWrapper = styled.div``;

const TabTitleLabel = styled.span`
  font-family: ${theme.fonts.fontFamily};
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: ${theme.colors.mainBlack};
`;

const TabBadge = styled.span`
  font-family: ${theme.fonts.fontFamily};
  font-style: normal;
  font-weight: bold;
  font-size: 0.8rem;
  line-height: 24px;
  color: ${theme.colors.mainWhite};
  background-color: ${theme.colors.red.light};
  padding: 4px 10px;
  margin-left: 8px;
`;

const TabTitle = ({ title, count }: { title: string; count: number }) => (
  <TabTitleWrapper>
    <TabTitleLabel>{title}</TabTitleLabel>
    {count > 0 && <TabBadge>{count}</TabBadge>}
  </TabTitleWrapper>
);

const CampfireTab = ({ onChange, tabs }: Props): React.ReactElement => (
  <TabWrapper className="campfireTabs">
    <StyledTabs defaultActiveKey="1" onChange={onChange}>
      {tabs.map((tab) => (
        <TabPane
          tab={<TabTitle title={tab.title} count={tab.count} />}
          key={tab.key}>
          {tab.children}
        </TabPane>
      ))}
    </StyledTabs>
  </TabWrapper>
);

export default CampfireTab;
