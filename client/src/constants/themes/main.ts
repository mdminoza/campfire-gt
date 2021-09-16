import { css } from 'styled-components';

const colors = {
  blue: {
    primary: '#196AC9', // default main blue
    dark: '#165DB1',
    accent: '#195bc9',
    blue196: '#196ac985',
    blue007: '#0075FF',
  },
  mainWhite: '#FFFFFF',
  mainBlack: '#000000',
  gray: {
    accent: '#F3F3F3',
    light: '#F0F0F0', // default light gray
    primary: '#E3E3E3',
    dark: '#D7D7D7',
    darker: '#899CB1',
    grayb9: '#b9b9b9',
    gray989: '#989898',
    gray8E: '#8E8E8E',
    grayDC: '#DCDCDC',
    gray76: '#767676',
    grayEE: '#EEEEEE',
    grayCE: '#CECECE',
    gray29: '#292929',
    gray2C: '#2C2C2C',
  },
  red: {
    light: '#C92E19',
  },
  green: {
    primary: '#008a00',
  },
  orange: '#E75A0B',
};

const fonts = {
  fontFamily: 'Open Sans',
  fontBoldFamily: 'Open Sans Bold',
};

const maxDimensions = {
  xs: 575,
  phone: 768, // Small same as antd breakpoint
  md: 992, // Medium same as antd breakpoint
  lg: 1200, // Large same as antd breakpoint
  xl: 1600, // Extra large same as antd breakpoint
};

const breakpoints = {
  mobile: '(min-width: 320px) and (max-width: 559px)',
  tablet: '(min-width: 560px) and (max-width: 1025px)',
  pc: '(min-width: 1026px)',
  mobileAndTablet: '(min-width: 320px) and (max-width: 1025px)',
};

const defaultBoxSizing = css`
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
`;

export default {
  colors,
  fonts,
  maxDimensions,
  breakpoints,
  defaultBoxSizing,
};
