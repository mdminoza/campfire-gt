import React, { PureComponent } from 'react';

type State = {};

type Props = {
  [key: string]: string | number | Function;
};

export default class extends PureComponent<Props, State> {
  render = (): React.ReactElement => (
    <svg
      width="81"
      height="76"
      viewBox="0 0 81 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...this.props}>
      <g filter="url(#filter0_d)">
        <rect x="21" y="15" width="38.7222" height="34" fill="white" />
      </g>
      <rect
        x="31.3887"
        y="26.3889"
        width="18.8889"
        height="0.944444"
        fill="#858585"
      />
      <rect
        x="31.3887"
        y="32.6852"
        width="18.8889"
        height="0.944444"
        fill="#858585"
      />
      <rect
        x="31.3887"
        y="38.9814"
        width="18.8889"
        height="0.944444"
        fill="#858585"
      />
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="80.7222"
          height="76"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="10.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.13 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
