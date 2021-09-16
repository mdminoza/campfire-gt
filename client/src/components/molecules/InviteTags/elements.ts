import styled from 'styled-components';
import { theme } from '../../../constants';

export const SelectionWrapper = styled.div`
  max-height: 430px;
  padding: 20px;
  background: ${theme.colors.mainWhite};
  display: flex;
  flex-direction: column;

  .ant-radio-group {
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
  }

  .ant-radio-wrapper {
    padding-bottom: 3px;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 400;
    color: ${theme.colors.red.light};
  }

  .ant-radio-wrapper-checked {
    font-weight: 700;
  }

  .ant-select-multiple .ant-select-selection-item {
    background: ${theme.colors.red.light};
    height: 32px;
    line-height: 28px;
  }

  .ant-select-multiple .ant-select-selection-item-content {
    color: ${theme.colors.mainWhite};
    font-size: 0.9rem;
    font-weight: 100;
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: 0;
    border-radius: 0;
    background: ${theme.colors.gray.light};
  }

  .ant-select-selection-overflow-item {
    align-self: auto;
  }

  .ant-select-selection-overflow {
    min-height: 100px;
  }
`;

export const Container = styled.div`
  width: 100%;
`;

export const SelectStyle = {
  width: '100%',
};

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

// for Storybook
export const StoryContainer = styled.div`
  width: 300vw;
  height: 100vh;
  background: ${theme.colors.gray.dark};
`;
