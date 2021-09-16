/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
// import { theme } from '../../../constants';

export const SponsoredContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0 0 100%;
  max-width: 100%;
`;

export const SponsoredWrapper = styled.div`
  display: 'block';
  flex: 0 0
    ${(props: { screenSize: number }): string =>
      props.screenSize >= 3
        ? '50%'
        : props.screenSize === 2
        ? '66.66666667%'
        : props.screenSize === 1
        ? '100%'
        : '50%'};
  max-width: ${(props: { screenSize: number }): string =>
    props.screenSize >= 3
      ? '50%'
      : props.screenSize === 2
      ? '66.66666667%'
      : props.screenSize === 1
      ? '100%'
      : '50%'};
`;

export const SponsonsoredFillerContainer = styled.div`
  display: ${(props: { screenSize: number }): string =>
    props.screenSize >= 2 ? 'contents' : 'none'};
  flex: 0 0
    ${(props: { screenSize: number }): string =>
      props.screenSize >= 3
        ? '45%'
        : props.screenSize === 2
        ? '33.33333333%'
        : props.screenSize === 1
        ? '100%'
        : '25%'};
  max-width: ${(props: { screenSize: number }): string =>
    props.screenSize >= 3
      ? '45%'
      : props.screenSize === 2
      ? '33.33333333%'
      : props.screenSize <= 1
      ? '100%'
      : '25%'};
`;

export const WrapperTemp = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 100%;
  max-width: 100%;
`;
