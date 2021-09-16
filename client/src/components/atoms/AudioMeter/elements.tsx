import styled from 'styled-components';
import { theme } from '../../../constants';

export const Bar = styled.div`
  height: 30px;
  width: 5px;
  background-color: ${theme.colors.gray.primary};
  margin-right: 3px;
  .on {
    background-color: ${theme.colors.green.primary};
  }
`;

export const AudioProgress = styled.div`
  display: flex;
`;
